const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://www.juwang999.com",
      changeOrigin: true,
      PathRewrite: {
        // "^/api": "",
      },
    }),
  );
  app.use(
    "/apiTJ",
    createProxyMiddleware({
      target: "https://www.api.firstscore.com",
      changeOrigin: true,
      PathRewrite: {
        // "^/api": "",
      },
    }),
  );
};
