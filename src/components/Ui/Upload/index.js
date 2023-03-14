import styles from "./index.less";
import { useState } from "react";
import upload from "@/helpers/upload";
import { Upload } from "../Icon";
import { useIntl } from "react-intl";
import { Img, LoadingScope, Toast } from "@/components/Ui";

const Index = (props) => {
  const intl = useIntl();
  const { title = intl.$t({ id: "UPLOAD_BTN" }), subTitle, onChange } = props;
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);

  const onImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > 20 * 1024 * 1024) {
        Toast.info(intl.$t({ id: "FILE_MAX_SIZE" }));
        return;
      }
      setLoading(true);
      try {
        const res = await upload("/player-resource/create", file);
        if (res.success) {
          setImage(URL.createObjectURL(file));
          onChange && onChange(res.filePath);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className={styles.card}>
        <LoadingScope />
      </div>
    );
  }

  return image ? (
    <div className={styles.file}>
      <Img src={image} />
    </div>
  ) : (
    <div className={styles.card}>
      <input type="file" onChange={onImageChange} accept="image/*" />
      <Upload />
      <div className={styles.title}>{title}</div>
      <div className={styles.subTitle}>
        {subTitle}
        {subTitle && <span style={{ color: "#FA6E42" }}>*</span>}
      </div>
    </div>
  );
};

export default Index;
