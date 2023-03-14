import { RtpPercent } from "@/components/Ui/Icon";
import "./index.less";

export default (props) => {
  const { rtp = 0, timeRtp = 0 } = props;
  return (
    <div className={`_card_rtp`}>
      <div className={`_card_rtp_left`}>{(rtp * 1).toFixed(1)}%</div>
      <div className={`_card_rtp_right`}>
        <>
          {(timeRtp * 100)?.toFixed(1)}%
          <RtpPercent />
        </>
      </div>
    </div>
  );
};
