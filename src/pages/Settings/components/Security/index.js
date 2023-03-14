import styles from "./index.less";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import { Button, Modal, PopupMb, Toast, Img } from "@/components/Ui";
import icon_password from "@/assets/personal/icon_password.webp";
import { isMobile } from "@/utils";
import { changePassword } from "@/services/auth";
import { useDispatch } from "react-redux";
import { removeToken } from "@/store/reducer/authSlice";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [visible, setVisible] = useState(false);

  const clickSubmit = async (data) => {
    if (!data.oldPassword || !data.newPassword || !data.confimPassword) {
      return;
    }
    if (data.oldPassword === data.newPassword) {
      Toast.info(intl.$t({ id: "Error_46001" }));
      return;
    }
    if (data.newPassword !== data.confimPassword) {
      Toast.info(intl.$t({ id: "SAME_PASSWORD" }));
      return;
    }
    const res = await changePassword({
      newPassword: data.newPassword,
      originalPassword: data.oldPassword,
    });
    if (res?.success) {
      Toast.info(intl.$t({ id: "RESET_SUCCESSED" }));
      setVisible(false);
      dispatch(removeToken());
      navigate("/");
    }
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit(clickSubmit)} className={styles.formContent}>
        <label>{intl.$t({ id: "SECURITY_OLD_PASSWORD_LABEL" })}</label>
        <input
          name="oldPassword"
          type="password"
          autoComplete="off"
          placeholder={intl.$t({ id: "SECURITY_OLD_PASSWORD_PLACEHOLDER" })}
          {...register("oldPassword")}
        />
        <label>{intl.$t({ id: "SECURITY_NEW_PASSWORD_LABEL" })}</label>
        <input
          type="password"
          name="newPassword"
          autoComplete="off"
          placeholder={intl.$t({ id: "SECURITY_NEW_PASSWORD_PLACEHOLDER" })}
          {...register("newPassword")}
        />
        <label>{intl.$t({ id: "SECURITY_CONFRIM_PASSWORD_LABEL" })}</label>
        <input
          type="password"
          name="confimPassword"
          autoComplete="off"
          placeholder={intl.$t({ id: "SECURITY_CONFRIM_PASSWORD_PLACEHOLDER" })}
          {...register("confimPassword")}
        />
        <button type="submit"> {intl.$t({ id: "CONFIRM" })}</button>
      </form>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{intl.$t({ id: "SECURITY_TITLE" })}</div>
      <div className={styles.subTitle}>
        {intl.$t({ id: "SECURITY_SUBTITLE" })}
      </div>
      <div className={styles.body}>
        <Img src={icon_password} />
        <div className={styles.content}>
          <div className={styles.name}> {intl.$t({ id: "PASSWORD" })}</div>
          <div className={styles.desc}>{intl.$t({ id: "SECURITY_DESC" })}</div>
        </div>
        <Button className={styles.confirmBtn} onClick={() => setVisible(true)}>
          {intl.$t({ id: "CHANGE" })}
        </Button>
      </div>
      {!isMobile() && (
        <Modal
          visible={visible}
          title={intl.$t({ id: "CHANGE_PASSWORD_TITLE" })}
          showFooter={false}
          onCancel={() => setVisible(false)}>
          {renderForm()}
        </Modal>
      )}

      {isMobile() && (
        <PopupMb
          visible={visible}
          title={intl.$t({ id: "CHANGE_PASSWORD_TITLE_MOBILE" })}
          onClose={() => setVisible(false)}>
          {renderForm()}
        </PopupMb>
      )}
    </div>
  );
};

export default Index;
