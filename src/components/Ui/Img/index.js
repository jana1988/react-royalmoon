import { Fragment } from "react";
import styles from "./index.less";

const Index = (props) => {
  const {
    className = "",
    src = "",
    alt = "",
    onClick = null,
    useContain,
    useCover,
  } = props;
  let fit = "initial";
  if (useContain) {
    fit = "contain";
  }
  if (useCover) {
    fit = "cover";
  }
  return (
    <Fragment>
      {useContain ? (
        <img
          className={styles.imgCover}
          src={src}
          alt={alt}
          style={{
            objectFit: "cover",
          }}
        />
      ) : null}
      <img
        className={`${styles.img} ${className}`}
        src={src}
        alt={alt}
        onClick={onClick}
        style={{
          objectFit: fit,
        }}
      />
    </Fragment>
  );
};

export default Index;
