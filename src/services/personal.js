/**
 * campaigns 优惠活动
 * response: [
    {
      "allowSameIp": true,
      "bannerUrl": "string",
      "bannerUrlMobile": "string",
      "betLimit": [
        {
          "amount": 0,
          "gameType": 1
        }
      ],
      "budget": 0,
      "campaignRepeatSetting": {
        "bonusStartTime": "2022-09-19T15:21:04.720Z",
        "periodsPerCycle": 0,
        "repeatOn": 0,
        "repeatPeriod": 0
      },
      "content": "string",
      "createdAt": "2022-09-19T15:21:04.720Z",
      "currency": "CNY",
      "dayMode": true,
      "dayType": 0,
      "dayValue": {
        "timezoneOffset": 8,
        "values": [
          "string"
        ]
      },
      "denyPlayerGroups": [
        {
          "id": 0,
          "name": "string"
        }
      ],
      "denyPlayerTags": [
        {
          "id": 0,
          "name": "string"
        }
      ],
      "displayToPlayer": true,
      "effectiveEndTime": "2022-09-19T15:21:04.720Z",
      "effectiveStartTime": "2022-09-19T15:21:04.720Z",
      "effectiveStartTimeLocal": "2022-09-19T15:21:04.720Z",
      "endTime": "2022-09-19T15:21:04.720Z",
      "hasMoreBonus": true,
      "id": 0,
      "lastBonusId": 0,
      "name": "string",
      "playerGroups": [
        {
          "id": 0,
          "name": "string"
        }
      ],
      "playerTags": [
        {
          "id": 0,
          "name": "string"
        }
      ],
      "players": [
        {
          "createdAt": "2022-09-19T15:21:04.720Z",
          "currency": "CNY",
          "group": {
            "id": 0,
            "name": "string"
          },
          "id": 0,
          "phoneNumber": "string",
          "tags": [
            {
              "id": 0,
              "name": "string"
            }
          ],
          "username": "string"
        }
      ],
      "sort": 0,
      "startTime": "2022-09-19T15:21:04.720Z",
      "startTimeLocal": "2022-09-19T15:21:04.720Z",
      "taskType": "0",
      "totalReleasedBonus": 0,
      "type": "1",
      "uid": "string",
      "updatedAt": "2022-09-19T15:21:04.720Z"
    }
  ]
 * 
 */

import request from "@/helpers/request";

export function getCampaigns() {
  return request("/campaigns").then((res) => res);
}

export function getAgent() {
  return request("/agent").then((res) => res);
}

export function getAgentsPlayersById(config) {
  return request(
    `/agents/${localStorage.getItem("agentId")}/players`,
    config,
  ).then((res) => res);
}

export function getAgentTrackingCodes() {
  return request("/agent/tracking-codes").then((res) => res);
}

export function getFreeSpin(config) {
  return request("/bonuses/free-spin", config).then((res) => res);
}
