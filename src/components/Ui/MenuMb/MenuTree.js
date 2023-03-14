import styles from "./index.less";
import { Back } from "../Icon";
const MenuTree = (props) => {
  const { items = [], onCollapsed, onClick = null } = props;
  const renderCaret = (item) => {
    if (item.children && item.children.length > 0) {
      return (
        <div
          className={`${styles.title} ${item.collapsed ? styles.active : ""}`}
          onClick={() => onCollapsed(item.key)}>
          {item.label}
          <span className={styles.arrow}>
            <Back />
          </span>
        </div>
      );
    }
    return (
      <div
        className={styles.title}
        onClick={() => {
          onClick();
          item.onClick && item.onClick();
        }}>
        {item.label}
      </div>
    );
  };

  return (
    <ul className={styles.menu_tree}>
      {items.map((item) => (
        <li className={`${styles.inner} `} key={item.key} data-key={item.key}>
          {renderCaret(item)}
          {item.children && item.children.length > 0 && item.collapsed && (
            <MenuTree items={item.children} onClick={onClick} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default MenuTree;
