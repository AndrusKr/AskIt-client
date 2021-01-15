const {createProxyMiddleware} = require("http-proxy-middleware")

module.exports = (app) => {
  console.log(createProxyMiddleware)
  app.use(
    "/app",
    createProxyMiddleware({
      target: "http//localhost:8080",
      ws: true,
    }),
  )
}
