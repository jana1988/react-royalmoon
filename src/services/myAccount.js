/**
 * getWalletsById：Cash Wallet
 * 入参
 * gameApiId: gameApiId
 *
 * response: {
 *   balance:金额
 * }
 *
 *
 * getPlayerInfo:获取玩家信息
 *
 * response: {
 *   levelUpRemainingBet: left to wager
 *   levelUpRemainingDeposit: left to deposit
 * }
 *
 *
 * getPaymentRequests:Deposit History
 *
 * response: {
 *   externalUid: Order Number
 *   paymentMethod.name: Payment
 *   amount: Deposit Amount
 *   approvalDate: Deposit Time
 *   requestedDate: Deposit Time
 *   status: Status
 * }
 *
 *
 * getPaymentRequests:Withdrawal History
 *
 * response: {
 *   externalUid: Order Number
 *   thirdPartyPaymentName: Payment
 *   amount: Withdrawal Amount
 *   approvalDate: Withdrawl Time
 *   requestedDate: Withdrawl Time
 *   status: Status
 * }
 */

import request from "@/helpers/request";

export function getWalletsById(id) {
  return request(`/wallets/${id}`);
}

export function getPlayerInfo() {
  return request("/player/info");
}

export function getPaymentRequests(params) {
  return request("/payment-requests", params);
}

export function getWithdrawRequests(params) {
  return request("/withdraw-requests", params);
}

export function getTransactions(params) {
  return request("/reports/transactions", params);
}

export function getRewardHistory(params) {
  return request("/withdraw-conditions", params);
}

export function getGameLog(params) {
  return request("/reports/game-logs", params);
}
