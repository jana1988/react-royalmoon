import axios from "axios";
const CancelToken = axios.CancelToken;
// https://www.51cto.com/article/700451.html
let cancel;
function baseURL() {
  const base = "/apiTJ";
  if (window.location.origin === "https://www.juwang999.com") {
    return `https://ht-api.firstscore.com${base}`;
  } else if (window.location.origin === "https://www.royalmoon.io") {
    return `https://api.firstscore.com${base}`;
  } else {
    return `https://ht-api.firstscore.com${base}`;
  }
}
// 创建一个axios实例
const instance = axios.create({
  baseURL: baseURL(),
  // baseURL: `https://api.firstscore.com/apiTJ`,

  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
});

// instance.interceptors.request.use((config) => { return config;});

// 拦截返回的数据
instance.interceptors.response.use(
  (response) => {
    return response.data.data;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

export default (url, params = {}, method = "GET", _headers = {}) => {
  if (method === "POST") {
    return instance({
      url,
      data: params,
      method,
      _headers,
      cancelToken: new CancelToken(function executor(c) {
        // executor 函数接收一个 cancel 函数作为参数
        cancel = c;
      }),
    });
  }
  return instance({
    url,
    params,
    method,
    _headers,
    cancelToken: new CancelToken(function executor(c) {
      // executor 函数接收一个 cancel 函数作为参数
      cancel = c;
    }),
  });
};

export { cancel };
