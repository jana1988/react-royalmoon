import request from "@/helpers/request";

/**
 * getPaymentMethods:獲取Deposit方式
 *
 * response : {
      "id": 1,
      "paymentApi": null,
      "name": "人工转帐",
      "type": 1,
      "typeName": "Bank Transfer",
      "bankAccountInfo": {
          "bankId": 100017,
          "bankName": "INDUSTRIAL AND COMMERCIAL BANK OF CHINA",
          "bankBranch": "上海市分行",
          "accountNumber": "1540-3241-1524-0063",
          "accountHolderName": "王二"
      },
      "minDeposit": 10.00000000,
      "maxDeposit": 1000.00000000,
      "formType": 1,
      "banks": null,
      "presetAmounts": [
          0
      ],
      "note": "转帐完毕之后，请将订单编号附加于转帐备注",
      "logoUrl": "https://www.gamegateway.t1t.games/includes/images/payment-vendor-logo/vnd/bankcard.png"
 * }
 */

export function getPaymentMethods() {
  return request(`/payment-methods/all-currencies`);
}

/**
 * 存款時發送
 * payload: {amount: "20", paymentMethodId: 1}
 * respose:"data":{"responseEnum":"OK","params":{"note":"转帐完毕之后，请将订单编号附加于转帐备注","amount":20.00000000,"depositRequestId":26},"message":"OK","qrcodeImgUrl":null,"redirectUrl":null,"redirectHttpMethod":null,"redirectParams":null,"callbackResponse":null,"success":true}
 */
export function paymentRequests(params) {
  return request("/payment-requests", params, "POST").then((res) => res);
}

/** 取得匯率 response : {"code":20000,"data":144.372} */
export function getExchangeRate(base, target) {
  return request(`/exchange-rate/${base}/${target}`);
}

/**取得 cashable amount : {
    "available": 8789.0274,
    "lockedOn": 0
  } 
*/
export function getWithdrawConditionsBalance() {
  return request(`/withdraw-conditions/balance`);
}

/**
 * 提款時發送
 * payload: {
    "accountNumber": "3333111122223333",
    "accountHolderName": "Li Cheng",
    "amount": 10,
    "bankBranch": "北京分行",
    "bankId": 100004,
    "withdrawPassword": "123456"
}
 * respose:"data":{"success":true,"errorCode":null,"message":null,"id":140262}
 */
export function withdrawRequestCreate(params) {
  return request("/withdraw-requests/create", params, "POST").then(
    (res) => res,
  );
}

/**
 * 取得提款的銀行列表（下拉框）
 * response: "data" :{
    "USDT": [
      {
        "id": 110038,
        "currency": "USDT",
        "name": "USDT (ERC20)",
        "code": "ETH",
        "icon": null,
        "minWithdraw": null,
        "maxWithdraw": null,
        "logoUrl": null,
        "enabled": true
      },
      {
        "id": 110039,
        "currency": "USDT",
        "name": "USDT (TRC20)",
        "code": "TRX",
        "icon": null,
        "minWithdraw": null,
        "maxWithdraw": null,
        "logoUrl": null,
        "enabled": true
      }
    ],
    "Other dollars" : [...]
 */
export function getAllWithdrawBanks() {
  return request(`/site-config/banks/all`);
}

/**
 * Withdraw体现银行卡列表
 * @returns
 */
export function getAvailableWithdrawApi() {
  return request(`/withdraw-requests/available-withdraw-api`);
}
