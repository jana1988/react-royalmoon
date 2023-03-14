import styles from "./index.less";
// import { AcCharge } from "@/components/Ui/Icon";
import { Title } from "../";
import { Button, Card } from "@/components/Ui";
import Swiper from "@/components/Swiper";
import { useEffect, useState, useRef } from "react";
import { FormattedMessage } from "react-intl";
import { useSelector, useDispatch } from "react-redux";
import { onChange } from "@/store/reducer/authSlice";
import { useNavigate } from "react-router-dom";
import { isMobile } from "@/utils";
import { getJackpot } from "@/services/home";

export default (props) => {
  const { jackpotSlot = [] } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [jackpotAmount, setJackpotAmount] = useState(null);

  const timerRef = useRef();

  const fetchJackpot = async () => {
    const res = await getJackpot();
    setJackpotAmount(res);
  };

  const dealData = () => {
    const data = jackpotSlot.map((item) => ({
      ...item,
      renderItem,
    }));

    setData(data);
  };

  useEffect(() => {
    dealData();
    fetchJackpot();
    timerRef.current = setInterval(fetchJackpot, 5 * 1000);
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  const renderItem = (item) => (
    <Card className={styles.card} src={item.gameImgUrl} item={item}>
      {/* <div className={styles.num}>
        <AcCharge />
        <span>$123,456,789</span>
      </div> */}
    </Card>
  );

  return (
    <div className={styles.jackpotSlots}>
      <div className={styles.content}>
        <Title>
          <FormattedMessage id="JACKPOT_SLOTS" />
        </Title>
        <div className={styles.box}>
          <div className={styles.amount}>${jackpotAmount}</div>
          {isLogin ? (
            <div className={styles.button}>
              <Button
                onClick={() => {
                  navigate("/slots", {
                    state: { gameTypeId: 15, featured: false },
                  });
                }}
                className={styles.buttonWrap}>
                <FormattedMessage id="READ_MORE" />
              </Button>
            </div>
          ) : (
            <div className={styles.button}>
              <Button
                onClick={() => {
                  dispatch(
                    onChange({ current: "login", visibleAuthModal: true }),
                  );
                }}
                className={styles.buttonWrap}>
                <span>
                  <FormattedMessage id="SIGN_UP" />
                </span>
              </Button>
            </div>
          )}
          <div className={styles.swiperWarpper}>
            <Swiper
              slidesPerGroup={isMobile() ? 3 : 5}
              slidesPerView={"auto"}
              data={data}
              classNavigation={styles.navigation}
              loopedSlides={5}
              swiperContainer="jackpotSlots"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
