import "./index.less";

const Index = (props) => {
  const { className = "" } = props;
  return (
    <div className={`_card_load ${className}`}>
      <div className={`_card_load_img`}></div>
      <div className={`_card_load_title`}></div>
      <div className={`_card_load_desc`}></div>
    </div>
  );
};

export default Index;
