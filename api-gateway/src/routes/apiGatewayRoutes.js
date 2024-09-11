const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

module.exports = function(app) {

  app.use('/users', createProxyMiddleware({
    target: process.env.USER_SERVICE_URL,
    changeOrigin: true
  }));

  app.use('/projects', createProxyMiddleware({
    target: process.env.PROJECT_SERVICE_URL,
    changeOrigin: true
  }));

  app.use('/auth', createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL,
    changeOrigin: true
  }));
  
};
