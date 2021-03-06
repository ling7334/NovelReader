'use strict'
require('./check-versions')()

const config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = (process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'production')
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable

const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
// currently disabled until this is resolved:
// https://github.com/jantimon/html-webpack-plugin/issues/680
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

// bodyParser dependency
const urlModule = require('url')
const bodyParser = require('body-parser')
app.use(bodyParser.json());
// serve REST test resource
app.get('/novel', (req, res) => res.send([{
  id: 1,
  title: '笑傲江湖',
  author: '金庸',
  lastread: '第一章　灭门',
  lasest: '第四十章　曲谐',
  update: '1969年10月12日',
  link: {name: 'novel', params: {novelname: '笑傲江湖'}}
},
{
  id: 2,
  title: '神雕侠侣',
  author: '金庸',
  lastread: '第01回　风月无情',
  lasest: '第40回　华山之巅',
  update: '1959年5月20日',
  link: {name: 'novel', params: {novelname: '神雕侠侣'}}
}]))

app.get('/user', (req, res) => {
  let params = urlModule.parse(req.url, true).query
  if (params.token === 'hv983h#ERTd$T#2o&GRvu9398') {
    res.send({
      'Status': 200,
      'StatusText': 'OK',
      'userid': 1,
      'username': 'Flynn',
      'email': 'ling7334@gmail.com',
      'hash': '425a8cd12571ccc2159cd4d4f6bfc1f5',
      'token': 'hv983h#ERTd$T#2o&GRvu9398',
      'refershToken': 'U)_Wh8e3p&T$#g)@H&903'
    })
  } else {
    res.send({
      'Status': 400,
      'StatusText': 'Token is invaild'
    })
  }
})

app.post('/login', (req, res) => {
  if (req.body.userid === 1 && req.body.password === 'password') {
    res.send({
      'Status': 200,
      'loginStatusText': 'OK',
      'userid': 1,
      'username': 'Flynn',
      'email': 'ling7334@gmail.com',
      'hash': '425a8cd12571ccc2159cd4d4f6bfc1f5',
      'token': 'hv983h#ERTd$T#2o&GRvu9398',
      'refershToken': 'U)_Wh8e3p&T$#g)@H&903'
    })
  } else {
    res.send({
      'Status': 500,
      'StatusText': 'Login Failed'
    })
  }
})

const uri = 'http://localhost:' + port

var _resolve
var _reject
var readyPromise = new Promise((resolve, reject) => {
  _resolve = resolve
  _reject = reject
})

var server
var portfinder = require('portfinder')
portfinder.basePort = port

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  portfinder.getPort((err, port) => {
    if (err) {
      _reject(err)
    }
    process.env.PORT = port
    var uri = 'http://localhost:' + port
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri)
    }
    server = app.listen(port)
    _resolve()
  })
})

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
