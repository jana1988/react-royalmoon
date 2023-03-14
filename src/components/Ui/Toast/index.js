import styles from "./index.less";

const createToast = (text = "") => {
  const div = document.createElement("div");
  const div1 = document.createElement("div");
  document.body.appendChild(div);
  div.appendChild(div1);
  div.className = styles.toast;
  div1.className = styles.dialog;
  div1.innerHTML = text;
};

const removeToast = (duration = 2000) => {
  setTimeout(() => {
    var element = document.getElementsByClassName(styles.toast)[0];
    element.parentNode.removeChild(element);
  }, duration);
};

const Index = () => {};

Index.info = async (text, duration) => {
  createToast(text);
  removeToast(duration);
};

export default Index;
