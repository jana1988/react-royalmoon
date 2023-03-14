import styles from "./index.less";
import { useRef, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useIntl } from "react-intl";
import { DatePicker, Toast, Loading, LoadingScope } from "@/components/Ui";
import dayjs from "dayjs";
import { saveUserProfile } from "@/services/setting";
import { isMobile } from "@/utils";

const Index = (props) => {
  const { data, email } = props;
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const intl = useIntl();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [birthday, setBirthday] = useState("");

  useEffect(() => {
    if (data) {
      setValue("firstName", data.firstName);
      setValue("address", data.address);
      setValue("line", data.line);
      setValue("phoneNumber", data.phoneNumber);
      if (data.birthday) {
        setBirthday(dayjs(data.birthday).format("YYYY-MM-DD"));
      }
      setLoading(false);
    }
  }, [data]);

  const clickSubmit = async (values) => {
    let params = {
      city: data.city,
      countryCode: data.countryCode || "JPN",
      countryPhoneCode: data.countryPhoneCode || 81,
      firstName: data.firstName,
      gender: data.gender,
      language: data.language,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      qq: data.qq,
      skype: data.skype,
      wechat: data.wechat,
      ...values,
    };
    if (birthday) {
      params.birthday = birthday;
    }
    setSubmitLoading(true);

    try {
      const res = await saveUserProfile(params);
      if (res?.success) {
        Toast.info("Save Success");
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>{intl.$t({ id: "PERSONAL_TITLE" })}</div>
      <form onSubmit={handleSubmit(clickSubmit)} className={styles.content}>
        {/* fullName */}
        <label>{intl.$t({ id: "PERSONAL_FULL_NAME" })}</label>
        <input
          autoComplete="off"
          disabled={Boolean(data?.firstName)}
          name="firstName"
          placeholder={intl.$t({ id: "PERSONAL_FULL_NAME_PLACEHOLDER" })}
          {...register("firstName")}
        />
        <div className={styles.message}>
          {intl.$t({ id: "PERSONAL_FULL_NAME_MESSAGE" })}
        </div>
        {/* Birth */}
        <label>{intl.$t({ id: "PERSONAL_BIRTH" })}</label>
        <DatePicker
          disabled={Boolean(data?.birthday)}
          textAlign="left"
          placeholder={birthday || "YYYY-MM-DD"}
          onChange={(date) => {
            setBirthday(dayjs(date).format("YYYY-MM-DD"));
          }}
        />
        {/* Phone Number */}
        <label>{intl.$t({ id: "PERSONAL_PHONE_NUMBER" })}</label>
        <input
          autoComplete="off"
          placeholder={intl.$t({
            id: "PERSONAL_PHONE_NUMBER_PLACEHOLDER",
          })}
          {...register("phoneNumber", { pattern: /^[1-9]\d{0,11}$/ })}
        />
        {errors?.phoneNumber?.type === "pattern" && (
          <p className={styles.error_messgae}>
            {intl.$t({ id: "PERSONAL_PHONE_ERROR" })}
          </p>
        )}
        {/* email */}
        <label>{intl.$t({ id: "PERSONAL_EMAIL" })}</label>
        <div className={styles.emailBox}>{email}</div>
        {/* address */}
        <label>{intl.$t({ id: "PERSONAL_ADDRESS" })}</label>
        <input
          autoComplete="off"
          disabled={Boolean(data?.address)}
          name="address"
          placeholder={intl.$t({ id: "PERSONAL_ADDRESS_PLACEHOLDER" })}
          {...register("address")}
        />
        {/* line */}
        <label>{intl.$t({ id: "PERSONAL_LINE" })}</label>
        <input
          autoComplete="off"
          name="line"
          placeholder={intl.$t({ id: "PERSONAL_LINE_PLACEHOLDER" })}
          {...register("line")}
        />
        {!isMobile() && (
          <button type="submit" className={styles.button}>
            {submitLoading ? <LoadingScope /> : intl.$t({ id: "CONFIRM" })}
          </button>
        )}
        {isMobile() && (
          <button type="submit" className={styles.button}>
            {intl.$t({ id: "CONFIRM" })}
          </button>
        )}
        {isMobile() && submitLoading && <Loading />}
      </form>
    </div>
  );
};

export default Index;
