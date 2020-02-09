'use strict'

const express = require('express')
const line = require('@line/bot-sdk')
const axios = require('axios')
const PORT = process.env.PORT || 3000

const config = {
  channelSecret: '',
  channelAccessToken: ''
}

const app = express()

app.post('/webhook', line.middleware(config), (req, res) => {
  console.log(req.body.events)
  Promise
    .all(req.body.events.map(handleEvent))
    .then(result => res.json(result))
})

const client = new line.Client(config)

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null)
  }

  let mes = ''
  if (event.message.text === '今日の花粉は？') {
    mes = 'ちょっと待ってね'
    getNodeVer(event.source.userId)
  } else {
    mes = event.message.text
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: mes
  })
}

const getNodeVer = async (userId) => {
  const res = await axios.get('https://tenki.jp/pollen/3/16/4410/13101/')
  const item = res.data
  const splitText = item.split('今日の天気')[1]
  const result = splitText.match(/class="pollen-telop">(.*?)<\/span>/)[1]
  console.log(result)

  await client.pushMessage(userId, {
    type: 'text',
    text: `今日の千代田区の花粉は${result}よ！`
  })
}

(process.env.NOW_REGION) ? module.exports = app : app.listen(PORT)
console.log(`Server running at ${PORT}`)
