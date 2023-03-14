import React from "react";
import TabPane from "./TabPane";
import styles from "./index.less";

import { useState } from "react";

const Index = (props) => {
  const {
    defaultActiveKey = "item-1",
    items = [],
    tabPosition = "top",
  } = props;
  const [activeKey, setActiveKey] = useState(defaultActiveKey);
  const onClick = (key) => {
    setActiveKey(key);
  };
  return (
    <div className={styles.tabs}>
      <div className={styles[tabPosition]}>
        <div className={`${styles.nav} ${styles["nav" + tabPosition]} `}>
          {items.map((item) => (
            <div
              className={`${styles.name} ${
                activeKey == item.key && styles.active
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
    </div>
  );
};
export default Index;
