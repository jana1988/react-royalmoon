import styles from "./index.less";
import { Loading } from "@/components/Ui";
import { isMobile } from "@/utils";
import { getBanner } from "@/services/home";
import { getGameList, getGames, getClassRTPRank } from "@/services/game";

import {
  Banner,
  JackpotSlots,
  PopularSlots,
  PopularLiveCasino,
  PopularTablGames,
  Promotions,
  OurAdvantages,
  YouMayLike,
  RTP,
} from "./components";

import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import SearchBox from "@/components/SearchBox";

import { useSelector } from "react-redux";
import { getPromotionsList } from "@/services/promotions";
import { isArray } from "lodash";

export default () => {
  const language = useSelector((state) => state.language);
  const [banners, setBanners] = useState({});
  const [rtp24, setRtp24] = useState({});

  const [jackpotSlot, setJackpotSlot] = useState([]);
  const [popularSlots, setPopularSlots] = useState([]);
  const [popularLives, setPopularLives] = useState([]);
  const [popularTablGames, setPopularTablGames] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [visibleSearchBox, setVisibleSearchBox] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchBanner = async () => {
    const res = await getBanner();
    if (res?.content) {
      const content = JSON.parse(res.content.replace(/'/g, '"'));
      setBanners(content);
    }
  };

  const fetch24Rtp = async () => {
    const resUp = await getClassRTPRank({
      categoryCode: 0,
      page: 1,
      limit: 18,
    });
    const resDn = await getClassRTPRank({
      categoryCode: 1,
      page: 1,
      limit: 18,
    });

    setRtp24({
      up: resUp.list,
      dn: resDn.list,
    });
  };

  const fetchGamesSlotJackpot = async () => {
    const res = await getGameList({
      gameApiGameCode: [
        {
          gameApiCode: "SoftGamingsBooongo",
          gameCodes: [
            "15_dragon_pearls",
            "moon_sisters",
            "great_panda",
            "tigers_gold",
          ],
        },
        {
          gameApiCode: "SoftGamingsMicrogaming",
          gameCodes: [
            "MGS_CarnavalJackpot_96",
            "MGS_adventuresOfDoubloonIslandDesktop",
            "MGS_AuroraWilds",
            "MGS_TempleCashFrogsnFlies",
            "MGS_SkillzGaming_FruitBlast92",
          ],
        },
        {
          gameApiCode: "SoftGamingsPGSoft",
          gameCodes: ["28"],
        },
        {
          gameApiCode: "SoftGamingsPragmaticPlay",
          gameCodes: [
            "vs40bigjuan",
            "vs25pandatemple",
            "vs432congocash",
            "vs243lionsgold",
            "vs7fire88",
          ],
        },
      ],
    });
    setJackpotSlot(res.list);
  };

  const fetchGamesPopularSlot = async () => {
    const res = await getGames({
      featured: true,
      limit: 27,
    });
    // const res = await getGameList({
    //   gameApiGameCode: [
    //     {
    //       gameApiCode: "SoftGamingsNoLimitCity",
    //       gameCodes: ["FireInTheHole", "BushidoWays", "SanQuentin"],
    //     },
    //     {
    //       gameApiCode: "SoftGamingsPlaynGo",
    //       gameCodes: ["365", "333", "352", "334", "285"],
    //     },
    //     {
    //       gameApiCode: "SoftGamingsPragmaticPlay",
    //       gameCodes: [
    //         "vs20starlight",
    //         "vs12bbb",
    //         "vs20olympgate",
    //         "vs20fruitsw",
    //         "vs20doghouse",
    //       ],
    //     },
    //     {
    //       gameApiCode: "SoftGamingsPushGaming",
    //       gameCodes: ["shadoworder", "jamminjars"],
    //     },
    //     {
    //       gameApiCode: "SoftGamingsRelaxGaming",
    //       gameCodes: ["moneytrain3", "ironbank", "moneytrain2"],
    //     },
    //     {
    //       gameApiCode: "SoftGamingsSolidGaming",
    //       gameCodes: [
    //         "GHG_OIRAN_DREAM",
    //         "GHG_HAWAIIAN_DREAM",
    //         "GHG_HAWAIIAN_DREAM_XMAS",
    //         "GHG_DREAMS_OF_GOLD_DELIGHT",
    //       ],
    //     },
    //   ],
    //   limit: 22,
    // });
    setPopularSlots(res.list);
  };

  const fetchGamesPopularLive = async () => {
    // const res = await getGameList({
    //   gameApiGameCode: [
    //     {
    //       gameApiCode: "SoftGamingsAsiaGaming",
    //       gameCodes: ["21", "25", "33", "B001", "23"],
    //     },

    //     {
    //       gameApiCode: "SoftGamingsEvolution",
    //       gameCodes: [
    //         "104",
    //         "108",
    //         "baccarat_sicbo",
    //         "blackjack",
    //         "sicbo",
    //         "dhp",
    //         "baccarat",
    //       ],
    //     },
    //   ],
    // });
    const res = await getGameList({
      gameApiGameCode: [
        {
          gameApiCode: "SoftGamingsEvolution",
          gameCodes: [
            "104",
            "108",
            "105",
            "baccarat_sicbo",
            "lightningscalablebj",
            "sicbo",
            "dragontiger",
            "americanroulette",
            "tcp",
            "baccarat",
          ],
        },
        {
          gameApiCode: "SoftGamingsAsiaGaming",
          gameCodes: [
            "32",
            "33",
            "C001",
            "C002",
            "C006",
            "C010",
            "C015",
            "B001",
            "24",
            "1",
          ],
        },
        {
          gameApiCode: "SoftGamingsPragmaticPlayLive",
          gameCodes: ["303", "103", "104", "401", "402"],
        },
        {
          gameApiCode: "SoftGamingsSAGaming",
          gameCodes: ["844", "842", "843", "830", "851"],
        },
      ],
      limit: 12,
    });
    setPopularLives(res.list);
  };

  const fetchGamesTablGames = async () => {
    const res = await getGameList({
      gameApiGameCode: [
        {
          gameApiCode: "SoftGamingsMicrogaming",
          gameCodes: [
            "MGS_DragonTiger",
            "MGS_Gamevy_retroSolitaireDesktop",
            "MGS_SicBo",
          ],
        },
        {
          gameApiCode: "SoftGamingsPGSoft",
          gameCodes: ["31"],
        },
        {
          gameApiCode: "SoftGamingsPlaynGo",
          gameCodes: ["409", "52"],
        },
        {
          gameApiCode: "SoftGamingsPragmaticPlay",
          gameCodes: ["rla"],
        },
        {
          gameApiCode: "SoftGamingsRedTigerGaming",
          gameCodes: ["ClassicBlackjack", "PuntoBanco"],
        },
        {
          gameApiCode: "SoftGamingsRelaxGaming",
          gameCodes: ["rlx.gvy.gvy.ROULETTE_10P", "blackjackneo"],
        },
        {
          gameApiCode: "SoftGamingsYggdrasil",
          gameCodes: ["22001"],
        },
      ],
    });

    setPopularTablGames(res.list);
  };

  const fetchCampaigns = async () => {
    const res = await getPromotionsList();
    if (isArray(res)) {
      setPromotions(res);
    }
  };
  const init = () => {
    setLoading(true);
    fetch24Rtp();
    Promise.all([
      fetchBanner(),

      fetchGamesSlotJackpot(),
      fetchGamesPopularSlot(),
      fetchGamesTablGames(),
      fetchGamesPopularLive(),
      fetchCampaigns(),
    ])
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    init();
  }, []);

  const renderSearch = () => (
    <>
      <div
        className={styles.search}
        onClick={() => {
          setVisibleSearchBox(true);
        }}>
        <p>
          <FormattedMessage id="PLEASE_ENTER_GAME_TITLE" />
        </p>
      </div>
      {visibleSearchBox && (
        <SearchBox
          visible={visibleSearchBox}
          onClose={() => {
            setVisibleSearchBox(false);
          }}
        />
      )}
    </>
  );

  return (
    <div className={styles.home}>
      {loading ? (
        <div className={styles.loading}>
          <Loading />
        </div>
      ) : (
        <>
          {!Object.keys(banners).length ? (
            <div className={styles.block} />
          ) : (
            banners[language.locale]?.length && <Banner banners={banners} />
          )}
          {isMobile() && renderSearch()}
          {/* <YouMayLike popularSlots={popularSlots} /> */}
          <RTP rtp24={rtp24} />
          <JackpotSlots jackpotSlot={jackpotSlot} />
          <PopularSlots popularSlots={popularSlots} />
          <PopularLiveCasino popularLives={popularLives} />
          <PopularTablGames popularTablGames={popularTablGames} />
          <Promotions promotions={promotions} />
          <OurAdvantages />
        </>
      )}
    </div>
  );
};
