
'use strict';

const express = require('express')

const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const TextMessage = require('viber-bot').Message.Text;
const UrlMessage = require('viber-bot').Message.Url;
const ContactMessage = require('viber-bot').Message.Contact;
const PictureMessage = require('viber-bot').Message.Picture;
const KeyboardMessage = require('viber-bot').Message.Keyboard;
//keyboard
const optionalKeyboard = {
	"keyboard": {
		"DefaultHeight": false,
		"BgColor": "#FFFFFF",
		"Buttons": [{
			"Columns": 6,
			"Rows": 1,
			"BgColor": "#2db9b9",
			"BgMediaType": "gif",
			"BgMedia": "https://www.url.by/test.gif",
			"BgLoop": true,
			"ActionType": "open-url",
			"ActionBody": "www.tut.by",
			"Image": "www.tut.by/img.jpg",
			"Text": "Key text",
			"TextVAlign": "middle",
			"TextHAlign": "center",
			"TextOpacity": 60,
			"TextSize": "regular"
		}]
	}
}
const thumbnail = "https://res.cloudinary.com/dvlngfltj/image/upload/v1698956158/yacpiret8fgrpzux4r2s.jpg"
require('dotenv').config()
const token = process.env.BOT_ACCOUNT_TOKEN
if (!process.env.BOT_ACCOUNT_TOKEN) {
    console.log('Could not find bot account token key.');
    return;
}
if (!process.env.EXPOSE_URL) {
    console.log('Could not find exposing url');
    return;
}
//test url
const url = "https://res.cloudinary.com/dvlngfltj/image/upload/v1698956158/yacpiret8fgrpzux4r2s.jpg"
const app = express()
const bot = new ViberBot({
	authToken: token,
	name: "MASSIMO",
	avatar: "https://res.cloudinary.com/dvlngfltj/image/upload/v1698956158/yacpiret8fgrpzux4r2s.jpg" // It is recommended to be 720x720, and no more than 100kb.
});
// Perfect! Now here's the key part:
bot.on(BotEvents.SUBSCRIBED, response => {
    response.send(new TextMessage(`Hi there ${response.userProfile.name}. I am ${bot.name}! Feel free to ask me anything.`));
});

bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
	// Echo's back the message to the client. Your bot logic should sit here.
   console.log(message);
	console.count(response.userProfile.name)
	response.send(new KeyboardMessage(optionalKeyboard));
	//response.send(new TextMessage(`Hi there ${response.userProfile.name}`))
	//response.send(new UrlMessage("https://upload.wikimedia.org/wikipedia/commons/3/3d/Katze_weiss.png"))
});
const port = process.env.PORT || 3000;
app.use("/viber/webhook", bot.middleware());
app.listen(port, () => {
    console.log(`Application running on port: ${port}`);
    bot.setWebhook(`${process.env.EXPOSE_URL}/viber/webhook`).catch(error => {
        console.log('Can not set webhook on following server. Is it running?');
        console.error(error);
        process.exit(1);
    });
});
