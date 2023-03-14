/**
 * getMessageList:获取当前玩家的私有消息
 * Method：Get
 * params：无
 *
 *
 * getPromotionDetail:获取活动详细信息
 * Method：Post
 * params：{id：Message id}
 *
 */

import request from "@/helpers/request";

export function getMessageList() {
  return request("/messages").then((res) => res);
}

export function readMessage(id) {
  return request(`/messages/${id}/read`, {}, "POST").then((res) => res);
}
