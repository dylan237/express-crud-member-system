// app.js 入口模組
// 職責
//  - 創建服務
//  - 做一些服務相關配置
//    + 模板引擎
//    + body-parser 解析表單 post 請求體
//  - 掛載路由
//  - 監聽端口啟動服務

const express = require('express')
const router = require('./router')
const bodyParser = require('body-parser')
const app = express()

const host = '127.0.0.1'
const port = 3000

app.use('/public/', express.static('./public/'))
app.engine('html', require('express-art-template'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(router)

app.listen(port, host, () => {
  console.log(`app is running at ${host}:${port} now ..`);
})