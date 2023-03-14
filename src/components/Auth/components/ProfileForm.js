import React from "react";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import styles from "./ProfileForm.less";
import { LoadingScope, Button } from "@/components/Ui";

const LoginForm = ({ onSubmit, loading }) => {
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
          name="firstName"
          autoComplete="off"
          placeholder={intl.$t({ id: "PERSONAL_FULL_NAME_PLACEHOLDER" })}
          {...register("firstName", { required: true })}
        />
        {errors.firstName?.type === "required" && (
          <span className={styles.messgae}>
            {intl.$t({ id: "PERSONAL_FULL_NAME_MESSAGE" })}
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
