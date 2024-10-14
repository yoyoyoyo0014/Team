const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
  // 리액트에서 /api/test로 요청하면 스프링에서는 /test로 맵핑
    '/ebook', 
    createProxyMiddleware({
      target: 'http://localhost:8080/ebook',	//스프링 포트
      changeOrigin: true,
    })
  );
};