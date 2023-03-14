import { useDispatch, useSelector } from "react-redux";
import { onChange } from "@/store/reducer/authSlice";
import { useNavigate } from "react-router-dom";

import styles from "./index.less";

const Index = ({
  children = null,
  to = "",
  isTarget = true,
  className = "",
  isIntercept = true,
  state = {},
}) => {
  const { isLogin } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div
      className={`${styles.link} ${className}`}
      onClick={() => {
        if (to) {
          if (isIntercept && !isLogin) {
            dispatch(
              onChange({
                current: "login",
                visibleAuthModal: true,
                link: to,
                isTarget,
              }),
            );
            return;
          }
          if (isTarget) {
            window.open(to);
          } else {
            navigate(to, { state });
          }
        }
      }}>
      {children}
    </div>
  );
};

export default Index;
