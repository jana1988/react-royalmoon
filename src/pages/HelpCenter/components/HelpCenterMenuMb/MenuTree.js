import styles from "./index.less";
import { Chevron, Download, Print } from "@/components/Ui/Icon";
import { useState } from "react";
import { PopupMb } from "@/components/Ui";
import { useIntl } from "react-intl";

const MenuTree = ({ items = [], onCollapsed }) => {
  const intl = useIntl();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentKey, setCurrentKey] = useState();
  const body = document.body;

  const handleOpenPopup = (key) => () => {
    setIsModalOpen(true);
    setCurrentKey(key);
    body.classList.add(styles.overflowHidden);
  };
  const handleClosePopup = () => {
    setIsModalOpen(false);
    setCurrentKey(null);
    body.classList.remove(styles.overflowHidden);
  };

  const renderCaret = (item) => {
    if (item.children && item.children.length > 0) {
      return (
        <div
          className={styles.titleWrapper}
          onClick={() => onCollapsed(item.key)}>
          <div className={styles.main}>
            <div className={styles.icon}>{item?.icon && item.icon}</div>
            <div className={styles.title}>{item.label}</div>
          </div>
          <Chevron
            className={`${styles.chevron} ${
              item.collapsed && styles.chevronActive
            }`}
          />
        </div>
      );
    }
    return (
      <>
        <div className={styles.childTitle} onClick={handleOpenPopup(item.key)}>
          {item.label}
        </div>
        <PopupMb
          visible={isModalOpen && currentKey === item.key}
          onClose={handleClosePopup}
          title={item.label}>
          <div className={styles.content}>{item.content}</div>
        </PopupMb>
      </>
    );
  };

  return (
    <>
      <ul className={styles.menuTree}>
        {items.map((item) => {
          return (
            <li className={styles.inner} key={item.key} data-key={item.key}>
              {renderCaret(item)}
              {item.children && item.children.length > 0 && item.collapsed && (
                <>
                  <MenuTree items={item.children} />
                  <button
                    type="button"
                    onClick={() => onCollapsed(item.key)}
                    className={styles.closeBtn}>
                    {intl.$t({ id: "COLLAPSE" })}
                  </button>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MenuTree;
