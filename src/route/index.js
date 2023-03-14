import { useRoutes } from "react-router-dom";
import Home from "@/pages/Home";
import Live from "@/pages/Live";
import Promotions from "@/pages/Promotions";
import PromotionsDetail from "@/pages/Promotions/detail";
import Vip from "@/pages/Vip";
import Slots from "@/pages/Slots";
import Game2 from "@/pages/Game2";
import Game from "@/pages/Game";
import GameSport from "@/pages/GameSport";
import MyFavourites from "@/pages/MyFavourites";
import Personal from "@/pages/Personal";
import MyAccount from "@/pages/MyAccount";
import DepositWithdraw from "@/pages/DepositWithdraw";
import Settings from "@/pages/Settings";
import Rewards from "@/pages/Rewards";
import ProxyRecruitment from "@/pages/ProxyRecruitment";

import Article from "@/pages/HelpCenter/components/Article";
import HelpCenter from "@/pages/HelpCenter";
import PrivateMessage from "@/pages/Personal/components/PrivateMessage";
import InviteFriends from "@/pages/InviteFriends";
import AboutUs from "@/pages/HelpCenter/components/AboutUs";
import YourAccount from "@/pages/HelpCenter/components/YourAccount";
import GettingStart from "@/pages/HelpCenter/components/GettingStart";
import TermsNConditions from "@/pages/HelpCenter/components/TermsNConditions";
import ContactUs from "@/pages/HelpCenter/components/ContactUs";

import NotFound from "@/pages/NotFound";
import Icon from "@/pages/Icon";
import NoIp from "@/pages/NoIp";

import { Navigate } from "react-router-dom";
import { newIntl } from "@/hooks/useIntl";

const DomTitle = ({ element, title = "Royal Moon" }) => {
  document.title = title;
  return element;
};

const configPersonal = [
  {
    path: "myaccount",
    element: (
      <DomTitle
        element={<MyAccount />}
        title={newIntl.intl.formatMessage({
          id: "SEO_MYACCOUNT",
        })}
      />
    ),
  },
  {
    path: "depositwithdraw",
    element: (
      <DomTitle
        element={<DepositWithdraw />}
        title={newIntl.intl.formatMessage({
          id: "SEO_DEPOSITWITHDRAW",
        })}
      />
    ),
  },
  {
    path: "settings",
    element: (
      <DomTitle
        element={<Settings />}
        title={newIntl.intl.formatMessage({
          id: "SEO_SETTINGS",
        })}
      />
    ),
  },
  {
    path: "privatemessage",
    element: (
      <DomTitle
        element={<PrivateMessage />}
        title={newIntl.intl.formatMessage({
          id: "SEO_PRIVATEMESSAGE",
        })}
      />
    ),
  },
  {
    path: "rewards",
    element: <DomTitle element={<Rewards />} />,
  },
  {
    path: "invitefriends",
    element: (
      <DomTitle
        element={<InviteFriends />}
        title={newIntl.intl.formatMessage({
          id: "SEO_INVITEFRIENDS",
        })}
      />
    ),
  },
];

export const config = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/home",
    element: (
      <DomTitle
        element={<Home />}
        title={newIntl.intl.formatMessage({
          id: "SEO_HOME",
        })}
      />
    ),
  },
  {
    path: "/slots",
    element: (
      <DomTitle
        element={<Slots />}
        title={newIntl.intl.formatMessage({
          id: "SEO_SLOTS",
        })}
      />
    ),
  },
  {
    path: "/live",
    element: (
      <DomTitle
        element={<Live />}
        title={newIntl.intl.formatMessage({
          id: "SEO_LIVE",
        })}
      />
    ),
  },

  {
    path: "/promotions",
    element: (
      <DomTitle
        element={<Promotions />}
        title={newIntl.intl.formatMessage({
          id: "SEO_PROMOTIONS",
        })}
      />
    ),
  },
  {
    path: "/promotions/:type/:id",
    element: (
      <DomTitle
        element={<PromotionsDetail />}
        title={newIntl.intl.formatMessage({
          id: "SEO_PROMOTIONS",
        })}
      />
    ),
  },
  {
    path: "/vip",
    element: (
      <DomTitle
        element={<Vip />}
        title={newIntl.intl.formatMessage({
          id: "SEO_VIP",
        })}
      />
    ),
  },

  {
    path: "/game2",
    element: <DomTitle element={<Game2 />} />,
  },
  {
    path: "/game",
    element: <DomTitle element={<Game />} />,
  },
  {
    path: "/gamesport",
    element: <DomTitle element={<GameSport />} />,
  },
  {
    path: "/personal",
    element: (
      <DomTitle
        element={<Personal />}
        title={newIntl.intl.formatMessage({
          id: "SEO_MYACCOUNT",
        })}
      />
    ),
    children: configPersonal,
  },

  {
    path: "/helpcenter",
    element: (
      <DomTitle
        element={<HelpCenter />}
        title={newIntl.intl.formatMessage({
          id: "SEO_HELPCENTER",
        })}
      />
    ),
    children: [
      {
        path: "/helpcenter",
        element: (
          <DomTitle
            element={<AboutUs />}
            title={newIntl.intl.formatMessage({
              id: "SEO_HELPCENTER",
            })}
          />
        ),
      },
      {
        path: "/helpcenter/aboutus",
        element: <DomTitle element={<AboutUs />} />,
        children: [
          {
            path: ":articleId",
            element: <DomTitle element={<Article />} />,
          },
        ],
      },
      {
        path: "/helpcenter/gettingstart",
        element: <GettingStart />,
        children: [
          {
            path: ":articleId",
            element: (
              <DomTitle
                element={<Article />}
                title={newIntl.intl.formatMessage({
                  id: "SEO_HOME",
                })}
              />
            ),
          },
        ],
      },
      {
        path: "/helpcenter/youraccount",
        element: <DomTitle element={<YourAccount />} />,
        children: [
          {
            path: ":articleId",
            element: <DomTitle element={<Article />} />,
          },
        ],
      },
      {
        path: "/helpcenter/termsandcontions",
        element: <DomTitle element={<TermsNConditions />} />,
        children: [
          {
            path: ":articleId",
            element: <DomTitle element={<Article />} />,
          },
        ],
      },
      {
        path: "/helpcenter/contactus",
        element: <DomTitle element={<ContactUs />} />,
        children: [
          {
            path: ":articleId",
            element: <DomTitle element={<Article />} />,
          },
        ],
      },
    ],
  },
  {
    path: "/proxyrecruitment",
    element: <DomTitle element={<ProxyRecruitment />} />,
  },
  {
    path: "/notfound",
    element: (
      <DomTitle
        element={<NotFound />}
        title={newIntl.intl.formatMessage({
          id: "SEO_NOTFOUND",
        })}
      />
    ),
  },
  {
    path: "/noip",
    element: <NoIp />,
  },
  {
    path: "*",
    element: <Navigate to="/notfound" />,
  },
  {
    path: "/myfavourites",
    element: <DomTitle element={<MyFavourites />} />,
  },
  // 适配移动端路由
  ...configPersonal,
  {
    path: "/icon",
    element: <Icon />,
  },
];

export default () => useRoutes(config);
