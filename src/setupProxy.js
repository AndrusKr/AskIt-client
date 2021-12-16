const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/app",
    createProxyMiddleware({
      target: "http//localhost:8080",
      ws: true,
    })
  );
};
