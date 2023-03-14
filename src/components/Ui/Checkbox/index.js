import style from "./index.less";

const Index = (props) => {
  const { children, onChange, value, className, checked = false } = props || {};
  return (
    <div className={className ? className : style.checkbox}>
      <input
        type="checkbox"
        value={value}
        id={value}
        onChange={onChange}
        checked={checked}
      />
      <label htmlFor={value} className={style.text}>
        {children}
      </label>
    </div>
  );
};

export default Index;
