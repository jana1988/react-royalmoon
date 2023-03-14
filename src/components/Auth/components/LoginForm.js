import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useIntl } from "react-intl";
import styles from "./LoginForm.less";
import { Img, LoadingScope, Loading, Toast, Button } from "@/components/Ui";
import { isMobile } from "@/utils";

const LoginForm = ({
  onSubmit,
  onClickCaptchaCode,
  captchaCode,
  onRegister,
  onForgotPassword,
  loading,
}) => {
  const intl = useIntl();
  const {
    control,
    formState: { errors },

    register,
    handleSubmit,
  } = useForm();

  const clickSubmit = (data) => {
    if (!data.username || !data.password || !data.verificationcode) {
      Toast.info(intl.$t({ id: "Error_Password" }));
      return;
    }
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(clickSubmit)}
      className={styles.content}
      id="login">
      <label>
        {intl.$t({ id: "LOGIN_USERNAME_LABEL" })} <sub>*</sub>
      </label>
      <input
        name="username"
        autoComplete="off"
        placeholder={intl.$t({ id: "LOGIN_USERNAME_PLACEHOLDER" })}
        {...register("username")}
      />
      <label>
        {intl.$t({ id: "LOGIN_PASSWORD_LABEL" })}
        <sub>*</sub>
      </label>
      <input
        type="text"
        name="password"
        autoComplete="off"
        placeholder={intl.$t({ id: "LOGIN_PASSWORD_PLACEHOLDER" })}
        {...register("password")}
        className={styles.password}
      />
      <label>
        {intl.$t({ id: "LOGIN_CODE_LABEL" })}
        <sub>*</sub>
      </label>
      <div className={styles.verificationcode}>
        <input
          name="verificationcode"
          autoComplete="off"
          placeholder={intl.$t({ id: "LOGIN_CODE_PLACEHOLDER" })}
          {...register("verificationcode", { required: true })}
        />
        <Img src={captchaCode} onClick={onClickCaptchaCode} />
      </div>
      {errors.verificationcode?.type === "required" && (
        <span className={styles.messgae}>
          {intl.$t({ id: "LOGIN_ENTER_VERFICATION" })}
        </span>
      )}
      <div className={styles.forgotPassword} onClick={onForgotPassword}>
        {intl.$t({ id: "LOGIN_FORGOT_PASSWORD" })}
      </div>
      <div className={styles.tip}>
        {intl.$t({ id: "LOGIN_BOTTOM_MESSAGE" })}
        <span onClick={onRegister}>
          {intl.$t({ id: "LOGIN_CREATE_ACCOUNT" })}
        </span>
      </div>
      {isMobile() && loading && <Loading />}
      {isMobile() && (
        <button type="submit">{intl.$t({ id: "LOGIN_LOGIN" })}</button>
      )}
      {!isMobile() && (
        <Button form="login">
          {loading ? (
            <LoadingScope />
          ) : (
            <span>{intl.$t({ id: "LOGIN_LOGIN" })}</span>
          )}
        </Button>
      )}
    </form>
  );
};

export default LoginForm;
