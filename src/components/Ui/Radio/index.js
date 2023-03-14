import { Img } from "@/components/Ui";
import style from "./index.less";

const Index = (props) => {
  const {
    children,
    value,
    checked = false,
    className = "",
    icon = "",
  } = props || {};
  return (
    <div className={`${style.radio} ${className}`}>
      <input
        type="radio"
        value={`${value}`}
        id={`${value}`}
        checked={checked}
        onChange={() => {}}
      />
      <label htmlFor={`${value}`} className={style.label}>
        {icon && <Img src={icon} className={style.img} />}
        <span className={style.text}>{children}</span>
      </label>
    </div>
  );
};

export default Index;
