import React from "react";
import style from "./RadioGroup.less";
const Index = React.forwardRef(
  ({ onChange = null, options = [], defaultValue = [], children }, ref) => {
    const normalizeChange = (value) => {
      if (value === "true") {
        return true;
      }

      if (value === "false") {
        return false;
      }

      if (!isNaN(value)) {
        return parseInt(value);
      }

      return value;
    };

    const _onChange = (e) => {
      const value = normalizeChange(e?.target?.value);
      return onChange(value);
    };
    return (
      <div className={style.radioGroup} onChange={_onChange}>
        {children}
      </div>
    );
  },
);

export default Index;
