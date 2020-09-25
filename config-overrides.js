const { override, addWebpackAlias } = require('customize-cra')
const path = require('path')
const resolveAlias = dir => path.join(__dirname, '.', dir)
const proxyApi = {
  '/api': {
    target: 'https://api.zhangtong.work/minio',
    changeOrigin: true,
    secure: false,
    xfwd: false,
    pathRewrite: {
      '^/api': '/'
    }
  }
}

module.exports = {
  webpack: override(
    addWebpackAlias({
      '@': resolveAlias('src')
    })
  ),
  devServer: configFunction => (proxy, allowedHost) => {
    proxy = process.env.NODE_ENV === 'development' ? proxyApi : null
    const config = configFunction(proxy, allowedHost)
    return config
  }
}
