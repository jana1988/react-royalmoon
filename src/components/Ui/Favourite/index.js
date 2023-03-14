import styles from "./index.less";
import { Img, Toast } from "@/components/Ui";
import defalut from "@/assets/ui/favorite/favourites_btn_0.svg";
import favourites from "@/assets/ui/favorite/favourites_btn_1.svg";
import { addFavoriteGame, removeFavoriteGame } from "@/services/game";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onChange } from "@/store/reducer/authSlice";
import pubsub from "pubsub-js";
import { useIntl } from "react-intl";

const Index = (props) => {
  const { isLogin } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const intl = useIntl();

  const { gameCode = "", gameApiId = "" } = props;
  const [favorite, setFavourite] = useState(props.favorite);
  const onClick = (e) => {
    e.stopPropagation();
    if (!isLogin) {
      dispatch(
        onChange({
          current: "login",
          visibleAuthModal: true,
        }),
      );
      return;
    }
    if (favorite) {
      removeFavoriteGame({ gameCode, gameApiId }).then((res) => {
        Toast.info(intl.$t({ id: "REMOVED_FROM_MY_FAVOURITES" }), 1000);
      });
    } else {
      addFavoriteGame({ gameCode, gameApiId }).then((res) => {
        Toast.info(intl.$t({ id: "ADDED_TO_MY_FAVOURITES" }), 1000);
      });
    }
    setFavourite(!favorite);
    pubsub.publish("games", "api");
  };
  return (
    <div className={`${styles.favorite}`} onClick={onClick}>
      <Img
        src={favorite ? favourites : defalut}
        className={styles.favorite_img}
      />
    </div>
  );
};

export default Index;
