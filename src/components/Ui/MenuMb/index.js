import { useEffect, useState } from "react";
import styles from "./index.less";
import MenuTree from "./MenuTree";
import { Close, Menu } from "@/components/Ui/Icon";
import useScrollPenetrate from "@/common/useScrollPenetrate";
import UseRefClose from "@/common/useRefClose";

const Index = (props) => {
  const [modalVisible, modalHide] = useScrollPenetrate();

  const {
    items = [],
    onClick = null,
    defaultKey = "",
    collapsed = false,
    footer = null,
  } = props;

  const [keyNodeMap, setKeyNodeMap] = useState([]);
  const [visible, setVisible] = useState(false);

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

  useEffect(() => {
    if (visible) {
      modalVisible();
    } else {
      modalHide();
    }
  }, [visible]);

  return (
    <div className={styles.menu}>
      <div className={styles.icon} onClick={() => setVisible(!visible)}>
        {visible ? <Close /> : <Menu />}
      </div>

      <div
        className={styles.mask}
        style={{ display: `${visible ? "block" : "none"}` }}>
        <UseRefClose
          visible={visible}
          callBack={(value) => {
            setVisible(value);
          }}>
          <div className={styles.content}>
            <div className={styles.wrapper}>
              <div className={styles.tree}>
                <MenuTree
                  items={keyNodeMap}
                  collapsed={collapsed}
                  onCollapsed={onCollapsed}
                  onClick={() => {
                    setVisible(!visible);
                  }}
                />
              </div>
              {footer && <div className={styles.footer}>{footer()}</div>}
            </div>
          </div>
        </UseRefClose>
      </div>
    </div>
  );
};

export default Index;
