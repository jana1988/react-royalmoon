/**
 * 过滤不展示头的页面  true是不展示，false是展示
 * @param {String} route 地址路由
 * @param {Boolean} isMobile 是否移动端
 * @returns {Boolean} Boolean
 */
const filterHeaderComp = (route, isMobile) =>
  ![
    {
      path: "/depositwithdraw",
      web: false,
      mobile: true,
    },
    {
      path: "/settings",
      web: false,
      mobile: true,
    },
    {
      path: "/myaccount",
      web: false,
      mobile: true,
    },
    {
      path: "/privatemessage",
      web: false,
      mobile: true,
    },
    {
      path: "/rewards",
      web: false,
      mobile: true,
    },
    {
      path: "/invitefriends",
      web: false,
      mobile: true,
    },
    {
      path: "/noip",
      web: true,
      mobile: true,
    },
    {
      path: "/game2",
      web: false,
      mobile: true,
    },
  ].some((item) => {
    if (route.includes(item.path)) {
      if (isMobile) {
        return item.mobile;
      } else {
        return item.web;
      }
    }
  });

// 过滤不展示底部的页面
const filterFooterComp = (route) =>
  ![
    "/depositwithdraw",
    "/personal",
    "/settings",
    "/notfound",
    "/privatemessage",
    "/rewards",
    "/game",
    // "/game2",
    "/gamesport",
    "/myaccount",
    "/invitefriends",
  ].includes(route);

// 过滤不展示移动端Tabbar的页面
const filterTabbarComp = (route) =>
  ![
    "/depositwithdraw",
    "/settings",
    "/privatemessage",
    "/notfound",
    "/game2",
    "/gamesport",
    "/game",
  ].includes(route);

// 过滤不展示底部padding
const filterContentPaddingButtomComp = (route) =>
  ![
    "/gamesport",
    "/game",
    "/settings",
    "/privatemessage",
    "/depositwithdraw",
    "/personal",
  ].includes(route);

export {
  filterHeaderComp,
  filterFooterComp,
  filterTabbarComp,
  filterContentPaddingButtomComp,
};
