import styles from "./index.less";
import { isMobile } from "@/utils";
import { useIntl } from "react-intl";
import { Img } from "@/components/Ui";

import vipMbEN from "@/assets/vip/Vip_en_web.webp";
import vipMbJP from "@/assets/vip/Vip_jp_web.webp";
import vipWebEN from "@/assets/vip/Vip_en_web@2x.webp";
import vipWebJP from "@/assets/vip/Vip_jp_web@2x.webp";
import bgVip from "@/assets/vip/bg_vip@2x.webp";
import bgVipMb from "@/assets/vip/bg_vip_mb.webp";

import reward from "@/assets/vip/image_reward.webp";
import manager from "@/assets/vip/image_manager.webp";
import nolimit from "@/assets/vip/image_nolimit.webp";

import sushi0 from "@/assets/vip/icon_vip0.webp";
import sushi1 from "@/assets/vip/icon_vip1.webp";
import sushi2 from "@/assets/vip/icon_vip2.webp";
import sushi3 from "@/assets/vip/icon_vip3.webp";
import sushi4 from "@/assets/vip/icon_vip4.webp";
import sushi5 from "@/assets/vip/icon_vip5.webp";
import sushi6 from "@/assets/vip/icon_vip6.webp";
import sushi7 from "@/assets/vip/icon_vip7.webp";
import sushi8 from "@/assets/vip/icon_vip8.webp";
import sushi9 from "@/assets/vip/icon_vip9.webp";

const Index = () => {
  const intl = useIntl();

  const subcharacter = [
    [
      reward,
      intl.$t({ id: "EXCLUSIVE_OFFERS" }),
      intl.$t({ id: "EXCLUSIVE_OFFERS_CONTENT" }),
    ],
    [
      manager,
      intl.$t({ id: "PRIVATE_VIP" }),
      intl.$t({ id: "PRIVATE_VIP_CONTENT" }),
    ],
    [
      nolimit,
      intl.$t({ id: "FAST_WITHDRAW" }),
      intl.$t({ id: "FAST_WITHDRAW_CONTENT" }),
    ],
  ];

  const vipConfig = [
    [sushi0, "LV. 0", ["$ 0", "$ 0", "$ 0", "$ 0"]],
    [sushi1, "LV. 1", ["$ 20,000", "$ 2,000", "$ 5", "$ 5"]],
    [sushi2, "LV. 2", ["$ 40,000", "$ 4,000", "$ 10", "$ 10"]],
    [sushi3, "LV. 3", ["$ 80,000", "$ 8,000", "$ 20", "$ 20"]],
    [sushi4, "LV. 4", ["$ 120,000", "$ 12,000", "$ 30", "$ 30"]],
    [sushi5, "LV. 5", ["$ 200,000", "$ 20,000", "$ 50", "$ 50"]],
    [sushi6, "LV. 6", ["$ 400,000", "$ 40,000", "$ 100", "$ 100"]],
    [sushi7, "LV. 7", ["$ 600,000", "$ 60,000", "$ 150", "$ 150"]],
    [sushi8, "LV. 8", ["$ 800,000", "$ 80,000", "$ 200", "$ 200"]],
    [sushi9, "LV. 9", ["$ 1,000,000", "$ 100,000", "$ 300", "$ 300"]],
  ];

  const vipConfigKey = [
    intl.$t({ id: "ROLLOVER_REQUIREMENT" }),
    intl.$t({ id: "DEPOSIT_REQUIREMENTS" }),
    intl.$t({ id: "LEVELUP_BONUS" }),
    intl.$t({ id: "BIRTHDAY_BONUS" }),
  ];

  const pc = () => (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.logoWrap}>
          <Img
            alt=""
            className={styles.logo}
            src={intl.locale === "ja" ? vipWebJP : vipWebEN}
          />
        </div>
        <div className={styles.logoTitleContainer}>
          {intl.$t({ id: "BECOME_VIP" })}
        </div>
      </div>
      <div className={styles.sushiContent}>
        <div className={styles.content}>
          <div className={styles.box}>
            <div className={styles.ul}>
              {subcharacter.map((item, index) => (
                <div className={styles.liWarprer} key={index}>
                  <div className={styles.li}>
                    <div className={styles.img}>
                      <Img alt="" src={item[0]} />
                    </div>
                    <div className={styles.title}>{item[1]}</div>
                    <div className={styles.desc}>{item[2]}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.sushiLV}>
        <div className={styles.li}>
          {vipConfig.map((item, index) => (
            <Img alt="" key={index} src={item[0]} />
          ))}
        </div>
        <div className={styles.tableWrap}>
          <table>
            <thead>
              <tr>
                <th>{intl.$t({ id: "LEVEL" })}</th>
                {vipConfigKey.map((k, i) => {
                  return <th key={i}>{k}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {vipConfig.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className={styles.column}>{item[1]}</td>
                    <td>{item[2][0]}</td>
                    <td>{item[2][1]}</td>
                    <td>{item[2][2]}</td>
                    <td>{item[2][3]}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className={styles.bgVipWrap}>
        <div className={styles.bgVip}>
          <Img alt="" src={bgVip} />
        </div>
        <div className={styles.bgVipContent}>
          {intl.$t({ id: "GOLDEN_VIP_CONTENT" })}
        </div>
      </div>
      <div className={styles.reminder}>
        <div className={styles.textTitle}> {intl.$t({ id: "VIP_TITLE" })}</div>
        <div
          className={styles.textContent}
          dangerouslySetInnerHTML={{
            __html: intl.$t({ id: "VIP_DESC" }),
          }}
        />
      </div>
    </div>
  );

  const mb = () => (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.logoWrap}>
          <Img
            alt=""
            className={styles.logo}
            src={intl.locale === "ja" ? vipMbJP : vipMbEN}
          />
        </div>
        <div className={styles.logoTitleContainer}>
          {intl.$t({ id: "WELCOME_TO_BECOME_VIP" })}
        </div>
      </div>
      <div className={styles.sushiContent}>
        <div className={styles.content}>
          <div className={styles.box}>
            <div className={styles.ul}>
              {subcharacter.map((item, index) => (
                <div className={styles.liWarprer} key={index}>
                  <div className={styles.li}>
                    <div className={styles.img}>
                      <Img alt="" src={item[0]} />
                    </div>
                    <div className={styles.title}>{item[1]}</div>
                    <div className={styles.desc}>{item[2]}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.sushiContent}>
        <div className={styles.content}>
          <div className={styles.box}>
            <div className={styles.ul}>
              {vipConfig.map((item, index) => (
                <div className={styles.liWarprer} key={index}>
                  <div className={styles.sushili}>
                    <div className={styles[`imgsushi_${index}`]}>
                      <Img alt="" src={item[0]} />
                    </div>
                    <div className={styles.sushiTitle}>{item[1]}</div>
                    <div className={styles.table}>
                      {item[2].map((v, i) => {
                        return (
                          <div key={i} className={styles.wrap}>
                            <div className={styles.left}>
                              • {vipConfigKey[i]}
                            </div>
                            <div className={styles.right}>{v}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bgVipWrap}>
        <div className={styles.bgVip}>
          <Img alt="" src={bgVipMb} />
        </div>
        <div className={styles.bgVipContent}>
          {intl.$t({ id: "GOLDEN_VIP_CONTENT" })}
        </div>
      </div>
      <div className={styles.textWrap}>
        <div className={styles.textTitle}> {intl.$t({ id: "VIP_TITLE" })}</div>
        <div
          className={styles.textContent}
          dangerouslySetInnerHTML={{
            __html: intl.$t({ id: "VIP_DESC" }),
          }}
        />
      </div>
    </div>
  );

  return isMobile() ? mb() : pc();
};

export default Index;
