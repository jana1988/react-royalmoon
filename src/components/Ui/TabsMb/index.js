import React from "react";
import TabPane from "./TabPane";
import styles from "./index.less";

import { useState } from "react";

const Index = (props) => {
  const {
    defaultActiveKey = "1",
    items = [],
    onChange = null,
    isScrollX = false,
  } = props;
  const [activeKey, setActiveKey] = useState(defaultActiveKey);
  const onClick = (key) => {
    setActiveKey(key);
    onChange && onChange(key);
  };
  return (
    <div className={styles.tabs}>
      <div className={`${styles.nav} ${isScrollX ? styles.navScrollX : ""}`}>
        {items.map((item) => (
          <div
            className={`${styles.name} ${
              activeKey == item.key ? styles.active : ""
            }`}
            key={item.key}
            onClick={() => onClick(item.key)}>
            {item.label}
          </div>
        ))}
      </div>
      <div className={styles.pane}>
        {items.map(
          (item) =>
            activeKey == item.key && (
              <TabPane key={item.key}>{item.children}</TabPane>
            ),
        )}
      </div>
    </div>
  );
};
export default Index;
