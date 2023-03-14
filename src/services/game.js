import request from "@/helpers/request";
import requestTJ from "@/helpers/requestTJ";

/**
 * getGames：获取遊戲列表
 * param:
 * currency: 幣別
 * 入参
 *  {
 *    featured: bool 是否為熱門遊戲
 *    page: int 頁碼
 *    limit: int 每頁多少筆資料
 *    gameTypeId: string 遊戲類別
 *    gameApiId: string 遊戲商
 *  }
 *
 * getGameTypes: 獲取遊戲列表
 *
 * response:{
 *  code:20000 成功
 *  data: [
 *    {
 *      id: 遊戲id
 *       name: 遊戲類型名稱
 *       gameApis: 支援的遊戲商
 *     }
 *   ]
 * }
 *
 * launchGame2: 取得遊戲網址
 * 
 * 入參
 *  {
 *    gameCode 遊戲代碼
      gameApiId: 遊戲商ID
 *  }
 *
 */

export function getGames(config = {}) {
  return request(`/games`, config, "GET", {}, true).then((res) => res);
}

export function getGameList(config) {
  return request(`/games`, config, "POST", {}, true).then((res) => res);
}

export function getGameTypes() {
  return request("/site-config/game-types");
}

export function launchGame2(config) {
  return request(`/launch-game2`, config);
}

export function launchGame(config) {
  return request(`/launch-game`, config);
}

/**
 * 添加收藏
 * @param {Object} config
 * @param {int} config.gameApiId
 * @param {string} config.gameCode
 * @returns
 */
export function addFavoriteGame(config) {
  return request(`/favorite-game`, config, "POST").then((res) => res);
}

/**
 * 移除收藏
 * @param {Object} config
 * @param {int} config.gameApiId
 * @param {string} config.gameCode
 * @returns
 */
export function removeFavoriteGame(config) {
  return request(`/favorite-game/delete`, config, "POST").then((res) => res);
}

export function getRTP(config) {
  return requestTJ(`/RTP`, config, "POST").then((res) => res);
}

export function getClassRTPRank(config) {
  return requestTJ(`/classRTPRank`, config).then((res) => res);
}
