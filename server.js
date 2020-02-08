'use strict'

const express = require('express')
const line = require('@line/bot-sdk')
const axios = require('axios')
const PORT = process.env.PORT || 3000

const config = {
  channelSecret: '1ee3a38c109374b683b77a0fd974e485',
  channelAccessToken: 'jo6xv3TJZq5++8SnXJ7igEL5SA+9nWGjhMJouvez0k/rIHnPCGskLHhBhtuycIxlwJMyraM+YLjhXc7XbA+rRMl5WfPQ+5IP9Sre0etwoeSsI3LfzEMgoRzrvroM+dvwxYBxQq+ZoyUpGvDyPSGN9QdB04t89/1O/w1cDnyilFU='
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
  if (event.message.text === '天気を教えて') {
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
  const res = await axios.get('http://weather.livedoor.com/forecast/webservice/json/v1?city=400040')
  const item = res.data

  await client.pushMessage(userId, {
    type: 'text',
    text: item.description.text
  })
}

(process.env.NOW_REGION) ? module.exports = app : app.listen(PORT)
console.log(`Server running at ${PORT}`)