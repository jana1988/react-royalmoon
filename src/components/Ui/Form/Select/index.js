import styles from "./index.less";

export default (props) => {
  const { defaultValue = "", options = [], onChange, label = "" } = props;
  return (
    <div className={styles.select}>
      <label>{label}</label>
      <select
        onChange={(e) => onChange(e.target.value)}
        defaultValue={defaultValue}>
        {options.map((item, index) => (
          <option value={item} key={index} className={styles.option}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};
