const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/ebook', 
    createProxyMiddleware({
      target: 'http://localhost:8080/ebook',	//스프링 포트
      changeOrigin: true,
    })
  );
};