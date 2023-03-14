import { useEffect, useState } from "react";
import styles from "./index.less";
import MenuTree from "./MenuTree";

const Index = ({ items = [], collapsed = false }) => {
  const [keyNodeMap, setKeyNodeMap] = useState([]);

  const buildKeyMap = (data, key) => {
    const keyNodeMap = data.slice(0);
    keyNodeMap.forEach((item) => {
      if (item.children && item.children.length > 0) {
        if (item.key === key) {
          item.collapsed = !item.collapsed;
        }
        buildKeyMap(item.children);
      }
    });
    setKeyNodeMap(keyNodeMap);
  };

  const onCollapsed = (key) => {
    buildKeyMap(keyNodeMap, key);
  };

  useEffect(() => {
    buildKeyMap(items);
  }, []);

  return (
    <div className={styles.menu}>
      <MenuTree
        items={keyNodeMap}
        collapsed={collapsed}
        onCollapsed={onCollapsed}
      />
    </div>
  );
};

export default Index;
