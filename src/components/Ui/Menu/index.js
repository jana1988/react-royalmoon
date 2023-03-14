import React, { useEffect, useState } from "react";
import styles from "./index.less";

const Index = (props) => {
  const {
    mode = "inline",
    items = [],
    onClick = null,
    defaultKey = "",
  } = props;

  const [currentkey, setCurrentKey] = useState(defaultKey);

  const onClickInline = (e) => {
    setCurrentKey(e.target.dataset.key);
  };

  useEffect(() => {
    setCurrentKey(defaultKey);
  }, [defaultKey]);

  const Inline = () =>
    items.map((item) => (
      <li
        className={`${styles.li} ${
          typeof item.label == "string" &&
          item.key === currentkey &&
          styles.active
        }`}
        key={item.key}
        data-key={item.key}>
        {typeof item.label == "string"
          ? item.label
          : React.cloneElement(item.label, {
              className: item.key === currentkey ? styles.active : "",
              ["data-key"]: item.key,
            })}
      </li>
    ));

  useEffect(() => {}, [currentkey]);

  return (
    <div className={styles.menu}>
      {mode === "inline" && (
        <ul className={styles.inline} onClick={onClickInline}>
          <Inline />
        </ul>
      )}
    </div>
  );
};

export default Index;
