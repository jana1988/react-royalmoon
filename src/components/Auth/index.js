import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Toast, Modal } from "@/components/Ui";

import styles from "./index.less";
import ModalPc from "./components/ModalPc";
import ModalMb from "./components/ModalMb";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ResetForm from "./components/ResetForm";
import ProfileForm from "./components/ProfileForm";

import { useIntl } from "react-intl";
import { isMobile } from "@/utils";
import {
  getVerificationCode,
  playerRegister,
  sendEmail,
  login,
  resetPassword,
} from "@/services/auth";
import { onChange, setToken } from "@/store/reducer/authSlice";
import { getPlayerInfo } from "@/services/myAccount";
import { fetchEmailVerification } from "@/services/auth";
import useScrollPenetrate from "@/common/useScrollPenetrate";
import { getUserProfile, saveUserProfile } from "@/services/setting";

const Index = () => {
  const search = new URLSearchParams(window.location.search);
  const intl = useIntl();
  const dispatch = useDispatch();
  const [modalVisible, modalHide] = useScrollPenetrate();

  const { current, visibleAuthModal, currency } = useSelector(
    (state) => state.auth,
  );

  // 忘记密码modal
  const [visibleReset, setVisibleReset] = useState(false);
  // 邮件发送成功modal
  const [sendSuccess, setSendSuccess] = useState(false);
  const [visibleProfile, setVisibleProfile] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingResetPassword, setLoadingResetPassword] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);

  const [time, setTime] = useState(0);
  const [verificationImg, setVerificationImg] = useState("");

  const [profile, setProfile] = useState({});
  const [tokens, setTokens] = useState({});
  const [isResetPasswordText, setIsResetPasswordText] = useState(false);

  const emailRef = useRef("");
  const captchaKeyRef = useRef("");
  const timerRef = useRef();

  // 获取验证码
  const fetchVerificationCode = async () => {
    const data = await getVerificationCode(isMobile() ? 105 : 110, 42);
    setVerificationImg(`data:image/jpeg;base64,${data.captchaCode}`);
    captchaKeyRef.current = data.captchaKey;
  };

  // 登录
  const fetchLogin = async (params) => {
    setLoading(true);
    try {
      const res = await login(
        params.username,
        params.password,
        captchaKeyRef.current,
        params.verificationcode,
      );
      if (res && res.access_token) {
        localStorage.setItem("access_token", res.access_token);
        if (search.get("email") && search.get("otp")) {
          const _res = await fetchEmailVerification({
            email: search.get("email"),
            otpCode: search.get("otp"),
          });
          if (!_res?.success) {
            localStorage.removeItem("access_token");
            return;
          }
        } else {
          const playInfo = await getPlayerInfo();
          if (!Boolean(playInfo?.emailVerified)) {
            emailRef.current = playInfo.email;
            setSendSuccess(true);
            fetchResendEmail();
            dispatch(onChange({ visibleAuthModal: false }));
            return;
          }
        }
        const _profile = await getUserProfile();
        if (!_profile.firstName) {
          setVisibleProfile(true);
          setProfile(_profile);
          dispatch(onChange({ visibleAuthModal: false }));
          setTokens(res);
          return;
        }
        dispatch(setToken(res));
      }
    } finally {
      setLoading(false);
    }
  };

  // 注册
  const fetchRegister = async (params) => {
    if (params.agentTrackingCode && params.agentTrackingCode.length !== 8) {
      Toast.info(intl.$t({ id: "REFERRAL_CODE_8" }));
      return;
    }
    setLoading(true);
    try {
      const res = await playerRegister({
        ...params,
        currency: currency,
      });
      if (res.success) {
        emailRef.current = params.email;
        dispatch(onChange({ visibleAuthModal: false }));
        setSendSuccess(true);
        localStorage.removeItem("agentTrackingCode");
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  // 忘记密码
  const fetchResetPassword = async (params) => {
    try {
      setLoadingResetPassword(true);
      const res = await resetPassword({
        ...params,
        captchaKey: captchaKeyRef.current,
      });
      setLoadingResetPassword(false);
      if (res.success) {
        setVisibleReset(false);
        Toast.info("The email has been sent");
      }
    } catch (error) {
      setLoadingResetPassword(false);
    }
  };

  // 重发邮件
  const fetchResendEmail = async () => {
    if (!localStorage.getItem("access_token")) {
      setSendSuccess(false);
      Toast.info("please login");
      dispatch(onChange({ current: "login", visibleAuthModal: true }));
      return;
    }
    try {
      setTime(30);
      const res = await sendEmail({ email: emailRef.current });

      if (res.success) {
        Toast.info(intl.$t({ id: "Email_ReSend" }));
      }
    } catch (error) {}
  };

  const fetchSaveUserProfile = async (values) => {
    setLoadingProfile(true);
    const config = { ...values, language: profile.language };
    try {
      const res = await saveUserProfile(config);
      if (res?.success) {
        dispatch(setToken(tokens));
        setLoadingProfile(false);
        setVisibleProfile(false);
      }
    } catch (error) {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    if (visibleAuthModal) {
      fetchVerificationCode();
      modalVisible();
    } else {
      modalHide();
    }
  }, [visibleAuthModal]);

  useEffect(() => {
    timerRef.current && clearInterval(timerRef.current);
    return () => timerRef.current && clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (time === 30)
      timerRef.current = setInterval(() => setTime((time) => --time), 1000);
    else if (time === 0) clearInterval(timerRef.current);
  }, [time]);

  const renderLoginForm = () => {
    return (
      <LoginForm
        loading={loading}
        captchaCode={verificationImg}
        onClickCaptchaCode={fetchVerificationCode}
        onSubmit={(data) => fetchLogin(data)}
        onForgotPassword={() => {
          setVisibleReset(true);
          setIsResetPasswordText(true);
        }}
        onRegister={() => {
          dispatch(onChange({ current: "register", visibleAuthModal: true }));
        }}
      />
    );
  };

  const renderRegisterForm = () => {
    return (
      <RegisterForm
        loading={loading}
        onSubmit={(data) => fetchRegister(data)}
        onLogin={() => {
          dispatch(onChange({ current: "login", visibleAuthModal: true }));
        }}
      />
    );
  };

  const tabs = [
    {
      title: intl.$t({ id: "LOGIN_TITLE" }),
      name: "login",
      text: intl.$t({ id: "LOGIN_TEXT" }),
      renderBody: renderLoginForm,
    },
    {
      title: intl.$t({ id: "REGISTER_TITLE" }),
      name: "register",
      text: intl.$t({ id: "REGISTER_TEXT" }),
      renderBody: renderRegisterForm,
    },
  ];

  const renderTitle = () => (
    <div className={styles.title}>
      {tabs.map((item) => (
        <div
          className={`${styles[`text_${intl.locale}`]} ${
            current === item.name ? styles.active : ""
          }`}
          key={item.name}
          onClick={() =>
            dispatch(onChange({ current: item.name, visibleAuthModal: true }))
          }>
          {item.title}
        </div>
      ))}
    </div>
  );

  // 忘记密码
  const renderResetModal = () => (
    <Modal
      visible={visibleReset}
      title={intl.$t({ id: "RESET_PASSWORD" })}
      showFooter={false}
      onCancel={() => setVisibleReset(false)}
      zIndex={9999}>
      <div className={styles.forgotPasswordModal}>
        <div className={styles.desc}>
          {intl.$t({ id: "RESET_PASSWORD_BY_EMAIL" })}
          <br /> {intl.$t({ id: "CONTACT_COSTOMER" })}
        </div>
        <ResetForm
          captchaCode={verificationImg}
          onClickCaptchaCode={fetchVerificationCode}
          onSubmit={fetchResetPassword}
          loading={loadingResetPassword}
        />
      </div>
    </Modal>
  );

  const renderSendEmailModal = () => (
    <Modal
      visible={sendSuccess}
      title={intl.$t({ id: "PLEASE_CHECK_YOUR_EMAIL" })}
      showFooter={false}
      onCancel={() => {
        setSendSuccess(false);
        setIsResetPasswordText(false);
        localStorage.removeItem("access_token");
      }}>
      <div className={styles.forgotPasswordModal}>
        <div
          className={styles.desc}
          dangerouslySetInnerHTML={{
            __html: intl.$t({
              id: "REGISTER_CONFIRM_EMAIL",
              // id: `${
              //   isResetPasswordText
              //     ? "AGAIN_RESEND_EMAIL"
              //     : "REGISTER_CONFIRM_EMAIL"
              // }`,
            }),
          }}></div>
        <Button
          className={styles.confirmBtn}
          onClick={fetchResendEmail}
          disabled={Boolean(time)}>
          {time ? `${time}s later` : intl.$t({ id: "RESEND_EMAIL" })}
        </Button>
      </div>
    </Modal>
  );

  const rendeProfileModal = () => (
    <Modal
      visible={visibleProfile}
      title={intl.$t({ id: "FULL_NAME_IS_REQUIRED" })}
      showFooter={false}>
      <div className={styles.forgotPasswordModal}>
        <div className={styles.desc}>
          {intl.$t({ id: "FULL_NAME_IS_REQUIRED_TIP" })}
        </div>
        <div className={styles.true}>
          {intl.$t({ id: "PERSONAL_FULL_NAME_TRUE" })}
        </div>
        <ProfileForm onSubmit={fetchSaveUserProfile} loading={loadingProfile} />
      </div>
    </Modal>
  );

  return (
    <div className={styles.auth}>
      {isMobile() ? (
        <ModalMb
          visible={visibleAuthModal}
          title={renderTitle()}
          text={tabs.find((item) => item.name === current).text}
          onCancel={() => dispatch(onChange({ visibleAuthModal: false }))}>
          {tabs.map(
            (item) =>
              item.name === current && (
                <div key={item.name}>{item.renderBody(item)}</div>
              ),
          )}
        </ModalMb>
      ) : (
        <ModalPc
          visible={visibleAuthModal}
          title={renderTitle()}
          text={tabs.find((item) => item.name === current).text}
          onCancel={() => dispatch(onChange({ visibleAuthModal: false }))}>
          {tabs.map(
            (item) =>
              item.name === current && (
                <div key={item.name}>{item.renderBody(item)}</div>
              ),
          )}
        </ModalPc>
      )}
      {renderResetModal()}
      {renderSendEmailModal()}
      {rendeProfileModal()}
    </div>
  );
};

export default Index;
