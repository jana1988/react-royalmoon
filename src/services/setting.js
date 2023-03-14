import request from "@/helpers/request";

export function getUserProfile() {
  return request("/player/profile").then((res) => res);
}

export function saveUserProfile(params) {
  return request("/player/profile", params, "POST").then((res) => res);
}

export function getKycList() {
  return request("/kyc/list").then((res) => res);
}

export function saveKyc(params) {
  return request("/kyc/create", params, "POST").then((res) => res);
}
