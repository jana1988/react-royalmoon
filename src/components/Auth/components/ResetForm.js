import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import styles from "./ResetForm.less";
import { Img, LoadingScope, Loading, Toast, Button } from "@/components/Ui";
import { isMobile } from "@/utils";
import { emailRegExp } from "../constant";

const LoginForm = ({ onSubmit, onClickCaptchaCode, captchaCode, loading }) => {
  const intl = useIntl();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const clickSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(clickSubmit)}
      className={styles.content}
      id="reset">
      <div className={styles.field}>
        <input
          name="username"
          autoComplete="off"
          placeholder={intl.$t({ id: "PLEASE_ENTER_YOUR_USERNAME" })}
          {...register("username", { required: true })}
        />
        {errors.username?.type === "required" && (
          <span className={styles.messgae}>
            {intl.$t({ id: "REGISTER_USERNAME_PLACEHOLDER" })}
          </span>
        )}
      </div>
      <div className={styles.field}>
        <input
          name="email"
          autoComplete="off"
          placeholder={intl.$t({ id: "EMAIL" })}
          {...register("email", { required: true })}
        />
        {errors.email?.type === "required" && (
          <span className={styles.messgae}>
            {intl.$t({ id: "PLEASE_ENTER_YOUR_EMAIL_ADDRESS" })}
          </span>
        )}
      </div>
      <div className={styles.field}>
        <div className={styles.verificationcode}>
          <input
            name="captchaCode"
            autoComplete="off"
            placeholder={intl.$t({ id: "LOGIN_CODE_PLACEHOLDER" })}
            {...register("captchaCode", { required: true })}
          />
          <Img src={captchaCode} onClick={onClickCaptchaCode} />
        </div>
        {errors.captchaCode?.type === "required" && (
          <span className={styles.messgae}>
            {intl.$t({ id: "Error_46010" })}
          </span>
        )}
      </div>

      <Button
        type="submit"
        loading={loading}
        className={styles.button}
        form={"reset"}>
        {loading ? <LoadingScope /> : intl.$t({ id: "CONFIRM_EMAIL" })}
      </Button>
    </form>
  );
};

export default LoginForm;
