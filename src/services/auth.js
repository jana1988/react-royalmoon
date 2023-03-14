/**
 * getVerificationCode：获取验证码图片
 * 入参
 * {
 * imageWidth:图片宽度
 * imageHeight:图片高度
 * }
 * 
 * response:{
 *  captchaCode:验证码base64图片
 *  captchaKey：验证码key  提交表单验证要传的key
 * }
 * 
 * 
 * playerRegister:注册
 * 入参：{
  "username": "string"    用户名
  "email": "string",      邮箱
  "password": "string",   密码
  "agentTrackingCode": "string",  代理code
  "appVersion": "V2",     app版本号
  "currency": "CNY",      币种
  "language": "en-Us",    语言
  "marketingChannel": "facebook",  营销渠道
  "referralCode": "string",  推荐码
}
  response:{
    code:20000 成功
    data:{
      errorCode:错误码
      message: 错误信息
    }
  }


    sendEmail: 发送验证码
    入参{
      "email": "string" 邮箱地址
    }
    response:{
        code:20000 成功
        data:{
          errorCode:错误码
          message: 错误信息
        }
      }
 */

import request from "@/helpers/request";
import { requestAuth } from "@/helpers/request";

export function getVerificationCode(imageWidth, imageHeight) {
  return request("/captcha-image", { imageWidth, imageHeight }).then(
    (res) => res,
  );
}

export function playerRegister(params) {
  return request("/player/register", params, "POST").then((res) => res);
}

export function sendEmail(params) {
  return request("/player/email-verification/send", params, "POST").then(
    (res) => res,
  );
}

export async function login(username, password, captchaKey, captchaCode) {
  return requestAuth({
    username,
    password,
    captchaKey,
    captchaCode,
    grant_type: "password",
  }).then((res) => res);
}

export function getCurrencies(params) {
  return request("/site-config/currencies").then((res) => res);
}

export function getUserEmail() {
  return request("/player/email").then((res) => res);
}

export function changePassword(params) {
  return request("/player/password", params, "POST").then((res) => res);
}

export function fetchEmailVerification(params) {
  return request("/player/email-verification", params, "POST").then(
    (res) => res,
  );
}

/**
 * 忘记密码
 * @param {*} params
 * @returns
 */
export function resetPassword(params) {
  return request("/player/reset-password", params, "POST").then((res) => res);
}
