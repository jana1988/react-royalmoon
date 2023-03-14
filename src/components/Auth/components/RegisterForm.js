import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import styles from "./RegisterForm.less";
import { Checked } from "@/components/Ui/Icon";
import { isMobile } from "@/utils";
import { Toast, LoadingScope, Loading } from "@/components/Ui";
import { cloneDeep } from "lodash";

const RegisterForm = ({ onSubmit, onLogin, loading }) => {
  const intl = useIntl();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      agentTrackingCode: localStorage.getItem("agentTrackingCode"),
    },
  });

  const [ageChecked, setAgeChecked] = useState(false);
  const [offerChecked, setOfferChecked] = useState(true);

  const clickSubmit = (data) => {
    if (!ageChecked) {
      Toast.info("Please check the box to approve the private policy");
      return;
    }
    let tempData = cloneDeep(data);
    if (!Boolean(tempData.agentTrackingCode)) {
      delete tempData.agentTrackingCode;
    }

    onSubmit({ ...tempData, acceptPromotionEmail: offerChecked });
  };

  return (
    <form onSubmit={handleSubmit(clickSubmit)} className={styles.content}>
      {/* username */}
      <div className={styles.field}>
        <label>
          {intl.$t({ id: "REGISTER_USERNAME_LABEL" })} <sub>*</sub>
        </label>
        <input
          type="text"
          autoComplete="off"
          placeholder={intl.$t({ id: "REGISTER_USERNAME_PLACEHOLDER" })}
          {...register("username", { required: true })}
        />
        {errors.username && (
          <span className={styles.messgae}>
            {intl.$t({ id: "REGISTER_USERNAME_PLACEHOLDER" })}
          </span>
        )}
      </div>
      {/* email */}
      <div className={styles.field}>
        <label>
          {intl.$t({ id: "REGISTER_EMAIL_LABEL" })} <sub>*</sub>
        </label>
        <input
          type="text"
          autoComplete="off"
          placeholder={intl.$t({ id: "REGISTER_EMAIL_PLACEHOLDER" })}
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className={styles.messgae}>
            {intl.$t({ id: "PLEASE_ENTER_YOUR_EMAIL_ADDRESS" })}
          </span>
        )}
      </div>

      {/* password */}
      <div className={styles.field}>
        <label>
          {intl.$t({ id: "REGISTER_PASSWORD_LABEL" })}
          <sub>*</sub>
        </label>
        <input
          type="text"
          autoComplete="off"
          placeholder={intl.$t({
            id: isMobile()
              ? "REGISTER_PASSWORD_PLACEHOLDER_MOBILE"
              : "REGISTER_PASSWORD_PLACEHOLDER",
          })}
          {...register("password", {
            required: true,
          })}
          className={styles.password}
        />
        {errors.password?.type === "required" && (
          <span className={styles.messgae}>
            {intl.$t({ id: "LOGIN_PASSWORD_PLACEHOLDER" })}
          </span>
        )}
      </div>
      {/* Bonus code */}
      <div className={styles.field}>
        <label>{intl.$t({ id: "REGISTER_CODE_LABEL" })}</label>
        <input
          autoComplete="off"
          name="agentTrackingCode"
          placeholder={intl.$t({ id: "REGISTER_CODE_PLACEHOLDER" })}
          {...register("agentTrackingCode")}
        />
      </div>

      {/* agree */}
      <div className={`${styles.checkbox} ${styles.ageCheckBox}`}>
        <div
          className={styles.checkboxView}
          onClick={() => setAgeChecked((checked) => !checked)}>
          {ageChecked && <Checked />}
        </div>
        <div
          className={styles.info}
          dangerouslySetInnerHTML={{
            __html: intl.$t({ id: "REGISTER_AGREE" }),
          }}></div>
      </div>
      {/* offer */}
      <div className={styles.checkbox}>
        <div
          className={styles.checkboxView}
          onClick={() => setOfferChecked((checked) => !checked)}>
          {offerChecked && <Checked />}
        </div>
        <div className={styles.info}>
          {isMobile()
            ? intl.$t({ id: "REGISTER_OFFERS_MOBILE" })
            : intl.$t({ id: "REGISTER_OFFERS" })}
        </div>
      </div>
      {/* button */}
      {isMobile() && loading && <Loading />}
      {isMobile() && (
        <button type="submit">{intl.$t({ id: "REGIST_REGIST_MOBILE" })}</button>
      )}
      {!isMobile() && (
        <button type="submit">
          {loading ? <LoadingScope /> : intl.$t({ id: "REGIST_REGIST" })}
        </button>
      )}

      <div className={styles.tip}>
        {intl.$t({ id: "REGIST_BOTTOM_MESSAGE" })}
        <span onClick={onLogin}>{intl.$t({ id: "REGISTER_LOGIN" })}</span>
      </div>
    </form>
  );
};

export default RegisterForm;
