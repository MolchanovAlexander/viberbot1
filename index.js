
'use strict';

const express = require('express')
const app = express()
const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
require('dotenv').config()
const token = process.env.VIBER_TOKEN
const bot = new ViberBot({
	authToken: token,
	name: "MASSIMO",
	avatar: "https://viber.com/avatar.jpg" // It is recommended to be 720x720, and no more than 100kb.
});
// Perfect! Now here's the key part:
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
	// Echo's back the message to the client. Your bot logic should sit here.
	response.send(message);
});
//app.use("/viber/webhook", bot.middleware());