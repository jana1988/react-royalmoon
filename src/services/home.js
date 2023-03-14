import request from "@/helpers/request";

export function getBanner() {
  return request("/cms/content-store/banner").then((res) => res);
}

export function getLanguages() {
  return request("/site-config/languages").then((res) => res);
}

export function submitLanguage() {
  return request(`/player/preference/language`, {}, "POST").then((res) => res);
}

export function getJackpot() {
  return request("/jackpot").then((res) => res);
}
