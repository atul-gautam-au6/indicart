 const { createProxyMiddleware } = require('http-proxy-middleware');

    module.exports = function(app) {
        app.use(
            '/api',           
           createProxyMiddleware({
              target: 'http://localhost:8081',
              changeOrigin: true,
            }))
        }
    //     app.use(proxy('/api/**', { target: 'http://localhost:5000' }));
    //     app.use(proxy('/otherApi/**', { target: 'http://localhost:5000' }));
    // };