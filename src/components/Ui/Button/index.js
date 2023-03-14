import { useEffect, useState } from "react";
import styles from "./index.less";
import { LoadingScope } from "@/components/Ui";
const Index = (props) => {
  const {
    onClick = null,
    form = "",
    children = "Button",
    className = "",
    loading = false,
    disabled = false,
  } = props || {};
  const [type, setType] = useState("button");
  useEffect(() => {
    if (form) {
      setType("submit");
    }
  }, []);
  const _onClick = () => {
    if (loading) {
      return;
    }
    onClick && onClick();
  };
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={_onClick}
      htmltype={type}
      form={form}
      disabled={disabled}>
      {loading ? <LoadingScope /> : children}
    </button>
  );
};

export default Index;
