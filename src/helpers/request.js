import axios from "axios";
import { Toast } from "@/components/Ui";
import { newIntl } from "@/hooks/useIntl";
import { TokenIgnore, isMustLanguages, codeIgnore } from "./constant";
import { languageEnum } from "@/common/constant";

let isRefreshing = false;
let hasNewToken = false;
// 重试队列，每一项将是一个待执行的函数形式
let requests = [];
// 创建一个axios实例
const instance = axios.create({
  baseURL: "/api",
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.setToken = (access_token) => {
  instance.defaults.headers["Authorization"] = access_token;
};

instance.interceptors.request.use((config) => {
  if (
    localStorage.getItem("access_token") &&
    !TokenIgnore.some((url) => config.url.includes(url))
  )
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "access_token",
    )}`;
  if (config.isCurrency) {
    config.url = `${config.url}/${localStorage.getItem("currency")}`;
  }

  if (isMustLanguages.some((url) => config.url.includes(url))) {
    config.headers["Accept-Language"] =
      languageEnum[localStorage.getItem("locale") || "ja"];
  }

  return config;
});

// 重新请求
function tautology(err) {
  let back = new Promise(function (resolve) {
    console.log("接口" + err.config.url + "请求失败，重新请求");
    resolve();
  });
  return back.then(function () {
    err.config.headers = {
      ...err.config.headers,
    };
    return instance(err.config);
  });
}

// 拦截返回的数据
instance.interceptors.response.use(
  (response) => {
    if (response?.data?.code === 40301) {
      if (!window.location.href.includes("/noip")) {
        window.location.replace("/noip");
      }
      return;
    } else if (response?.data?.code !== 40301) {
      if (window.location.href.includes("/noip")) {
        window.location.replace("/");
        return;
      }
    }

    if (response?.data?.code && !codeIgnore.includes(response?.data?.code)) {
      Toast.info(
        newIntl.intl.formatMessage({ id: `Error_${response.data.code}` }),
      );
    }
    return response.data.data;
  },
  async (error) => {
    if (error?.response?.status === 401) {
      const config = error.config;
      // 如果已经有了新token直接再次请求
      if (hasNewToken) {
        return await tautology(error);
      }
      if (!isRefreshing) {
        hasNewToken = false;
        isRefreshing = true;
        refreshToken()
          .then((res) => {
            config.headers = {
              "Content-Type": config.headers["Content-Type"],
            };
            instance.setToken(res.data.access_token);
            localStorage.setItem("refresh_token", res.data.refresh_token);
            localStorage.setItem("access_token", res.data.access_token);
            hasNewToken = true;
            setTimeout(() => {
              hasNewToken = false;
            }, 10000);
            requests.forEach((cb) => cb());
            requests = [];
            isRefreshing = false;
          })
          .catch((res) => {
            const { status } = res.response;
            if (status === 400) {
              localStorage.setItem("refresh_token", "");
              localStorage.setItem("access_token", "");
              localStorage.setItem("isLogin", "");
              // window.location.href = "/";
            }
          });
        return await tautology(error);
      } else {
        return new Promise((resolve) => {
          requests.push(async () => {
            resolve(await tautology(error));
          });
        });
      }
    }

    return Promise.reject(error);
  },
);

export default (
  url,
  params = {},
  method = "GET",
  _headers = {},
  isCurrency = false,
) => {
  if (method === "POST") {
    return instance({
      url,
      data: params,
      method,
      _headers,
      isCurrency,
    });
  }
  return instance({ url, params, method, _headers, isCurrency });
};

function refreshToken() {
  return axios.post(
    `/api/oauth/token?currency=${localStorage.getItem("currency")}`,
    {
      client_id: "T1SBE-player",
      client_secret: "T1SBE-rocks",
      grant_type: "refresh_token",
      refresh_token: localStorage.getItem("refresh_token"),
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    },
  );
}

export function requestAuth(params) {
  return axios
    .post(
      `/api/oauth/token?currency=${localStorage.getItem("currency")}`,
      {
        client_id: "T1SBE-player",
        client_secret: "T1SBE-rocks",
        ...params,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error?.response?.status === 400) {
        Toast.info(
          newIntl.intl.formatMessage({
            id: `Error_${error?.response?.data?.code}`,
          }),
        );
        // Toast.info(
        //   newIntl.intl.formatMessage({
        //     id: `Error_${error?.response?.data?.code}`,
        //   }),
        // );
      }
    });
}
