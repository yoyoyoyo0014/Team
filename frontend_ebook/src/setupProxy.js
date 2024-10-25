const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
<<<<<<< HEAD
    'api/', 
=======
    '/api', 
>>>>>>> KCL
    createProxyMiddleware({
      target: 'http://localhost:8080/ebook',	//스프링 포트
      changeOrigin: true,
    })
  );
<<<<<<< HEAD
  // app.use(
  //       'isbnLb/', 
  //       createProxyMiddleware({
  //         target: 'https://www.nl.go.kr/',	//스프링 포트
  //         changeOrigin: true,
  //       })
  //     );
=======
>>>>>>> KCL
};