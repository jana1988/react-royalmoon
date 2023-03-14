import styles from "./Games.less";
import { Img } from "@/components/Ui";
import { hover_video } from "@/assets/home";

const Index = ({ className = "", isHovered = false }) => {
  return (
    isHovered && (
      <div className={`${styles.c_games} ${className}`}>
        <Img src={hover_video} />
      </div>
    )
  );
};

export default Index;
