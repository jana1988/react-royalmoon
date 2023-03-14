import React from "react";
import styles from "./index.less";

const Index = React.forwardRef(
  (
    {
      onChange,
      label,
      name,
      type = "text",
      placeholder = "",
      value = "",
      message = "",
      className = "",
      required = false,
      autoComplete = "off",
    },
    ref,
  ) => {
    return (
      <div className={`${styles.input} ${className}`}>
        <div className={styles.content}>
          {label && (
            <label>
              {label}
              {required && <sub>*</sub>}
            </label>
          )}

          <input
            autoComplete={autoComplete}
            name={name}
            ref={ref}
            onChange={onChange}
            type={type}
            placeholder={placeholder}
            value={value}
          />
          {message && <div className={styles.message}>{message}</div>}
        </div>
      </div>
    );
  },
);
export default Index;
