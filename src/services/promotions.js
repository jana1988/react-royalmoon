/**
 * getPromotionsList:获取当前玩家可见的所有活动
 * Method：Get
 * params：无
 * response：{ id：活动id, type:活动类型, bannerUrl: 活动图片, bannerUrlMobile:移动端使用图片, name:活动标题，content:活动描述}
 *
 *
 * getPromotionDetail:获取活动详细信息
 * Method：Get
 * params：{type:活动类型， id：活动id}
 * response：{ bannerUrl: 头部图片, bannerUrlMobile:移动端使用图片, name:活动标题，content:活动描述}
 *
 */

import request from "@/helpers/request";

export function getPromotionsList() {
  return request("/campaigns2").then((res) => res);
}

export function getPromotionDetail(type, id) {
  return request(`/campaigns/${type}/${id}`).then((res) => res);
}
