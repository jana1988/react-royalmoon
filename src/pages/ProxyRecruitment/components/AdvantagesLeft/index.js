import styles from "./index.less";

export default (props) => {
  const { icon: Icon, title, sub } = props || {};
  return (
    <div className={styles.content}>
      <Icon />
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.sub}>{sub}</div>
      </div>
    </div>
  );
};
