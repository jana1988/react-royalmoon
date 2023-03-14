/**
 * 移动端判断
 */
export const isMobile = () =>
  navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i,
  );

/**
 * 延迟器
 * @param {*} wait
 * @returns
 */
export const isDelay = (wait = 5000) =>
  new Promise((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      resolve(true);
    }, wait);
  });

/**
 * 获取游戏链接
 */
export const getGameUrl = ({
  gameCode = "",
  gameApiId = "",
  gameName = "",
  gameApiCode = "",
  favorite = false,
  gameApiName = "",
}) => {
  if (gameCode === "worldcup" || gameCode === "raffle") {
    return `/game?gameCode=${gameCode}&gameApiId=${gameApiId}`;
  }
  if (gameCode === "sport") {
    return `/gamesport?gameCode=${gameCode}&gameApiId=${gameApiId}`;
  }
  return `/game2?gameCode=${gameCode}&gameApiId=${gameApiId}&gameName=${gameName}&gameApiCode=${gameApiCode}&gameApiName=${gameApiName}&favorite=${favorite}`;
};

/**
 * 打开Email
 */
export const openEmail = () => {
  window.open("mailto:support@royalmoon.io");
};

/**
 * live chat接入
 */
export const liveChat = () => {
  // const chatContainer = document.querySelector("#chat-widget-container");
  const clickEvent = new Event("click", {
    bubbles: true,
    cancelable: false,
  });
  const iframe = document.querySelector("#chat-widget-minimized");
  if (!iframe) {
    return;
  }
  const el = iframe.contentWindow.document.querySelector("button");
  el.dispatchEvent(clickEvent);
};

/** 游戏优先级展示 */
export function srotGameByIds(data = [], gameApiIds = [], isSort = false) {
  if (!isSort) return data;
  if (!gameApiIds.length) return data;
  const dataMap = Object.fromEntries(
    gameApiIds.map((gameApiId, i) => [gameApiId, i + 1]),
  );
  const res = data.map((item) => {
    if (dataMap[item.gameApiId]) {
      item.priority = dataMap[item.gameApiId];
    } else {
      item.priority = 99;
    }
    return item;
  });

  return res.sort((a, b) => a.priority - b.priority);
}

/** px转vw */
export function stylePxToVw(num = 0) {
  return `${(num / 1920) * 100}vw`;
}

export function getClientHeight() {
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    return document.body.clientHeight < document.documentElement.clientHeight
      ? document.body.clientHeight
      : document.documentElement.clientHeight;
  }
  return document.body.clientHeight > document.documentElement.clientHeight
    ? document.body.clientHeight
    : document.documentElement.clientHeight;
}

/**
 * 数组对象去重
 * @param {Array} arr  需要去重的对象数组
 * @param {string} key 判断重复的关键字, 如果是基本数据类型，则不传
 * */

export function arrNoRepeat(arr = [], key = "") {
  if (!key) {
    return [...new Set(arr)];
  }
  let obj = {};
  arr = arr.reduce((item, next) => {
    // no-unused-expressions
    obj[next[key]] ? "" : (obj[next[key]] = true && item.push(next));
    return item;
  }, []);
  return arr;
}

/**
 * 不四舍五入 保留2位小数
 * @param {*} num
 */
export function toFixed2(num = 0) {
  if (typeof num !== "number" || num == 0) {
    return "0.00";
  }
  if (num < 0) {
    return -Math.abs(num)
      .toString()
      .match(/^\d+(?:\.\d{0,2})?/);
  }
  return num.toString().match(/^\d+(?:\.\d{0,2})?/);
}

export function sortFirstString(arr = [], providerIds = []) {
  const arrSort = arr.sort((a, b) => {
    return a.label.charCodeAt() - b.label.charCodeAt();
  });
  if (!providerIds.length) return arrSort;

  let result = [];
  for (let i = 0; i < providerIds.length; i++) {
    result = result.concat(arrSort.filter((m) => m.value === providerIds[i]));
  }
  for (let i = 0; i < providerIds.length; i++) {
    arrSort.splice(
      arrSort.findIndex((item) => item.value === providerIds[i]),
      1,
    );
  }
  return result.concat(arrSort);
}

/**
 * 游戏商名字截取
 * @param {*} name
 */
export function gameApiNameReplace(name = "") {
  if (!name) return name;
  const names = [
    {
      old: "SoftGamings",
      new: "",
    },
    {
      old: "PRAGMATICPLAYSEAMLESS",
      new: "PragmaticPlay",
    },
  ];
  let newName = name;
  names.forEach((element) => {
    newName = newName.replace(element.old, element.new);
  });
  return newName;
}

export const isNmunber = (num) => typeof num === "number";

export const isRtpDn = (num, rtp) => num * 100 < rtp;
