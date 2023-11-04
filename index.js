
'use strict';

const express = require('express')
const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const TextMessage = require('viber-bot').Message.Text;
const UrlMessage = require('viber-bot').Message.Url;
const ContactMessage = require('viber-bot').Message.Contact;
const PictureMessage = require('viber-bot').Message.Picture;
const KeyboardMessage = require('viber-bot').Message.Keyboard;
const RichMediaMessage = require('viber-bot').Message.RichMedia;
//keyboard
const { SAMPLE_KEYBOARD, SAMPLE_RICH_MEDIA, menuOptions, menuRichMedia, START_KEYBOARD } = require('./keyboards');
const thumbnail = "https://res.cloudinary.com/dvlngfltj/image/upload/v1698956158/yacpiret8fgrpzux4r2s.jpg"
require('dotenv').config()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const BASE_URL = process.env.BASE_URL
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
//app.use(express.json())app.use(cors())

let categories = []
const cors = require('cors');
const app = express()
const bot = new ViberBot({
	authToken: token,
	name: "MASSIMO",
	avatar: "https://res.cloudinary.com/dvlngfltj/image/upload/v1698956158/yacpiret8fgrpzux4r2s.jpg" // It is recommended to be 720x720, and no more than 100kb.
});
const showCategories = async (categories, response) => {
	try {
		categories.length > 0 ? null : categories = await prisma.category.findMany();
		response.send(new KeyboardMessage(menuOptions(categories), null, null, null, 3));
	} catch (err) {
		console.log("showCategories erros", err);
	} finally {
		prisma.$disconnect()
		return categories
	}
}
const startButtons = async (response) => {
	try {
		await response.send(new KeyboardMessage(START_KEYBOARD, null, null, null, 10))
	} catch (error) {
		console.log("startButtons error", error);
	} finally {
		return
	 }
}
const postProducts = async (data, categories, response) => {
	try {
		await prisma.$connect()
		categories.length > 0 ? null : categories = await prisma.category.findMany()
		const products = await prisma.product.findMany({ where: { ...{ catSlug: data } } })
		Promise.all(products.map(async (p) => {
			await response.send(new RichMediaMessage(menuRichMedia(p, BASE_URL)));
		}))
			.then(async () => await response.send(new RichMediaMessage(SAMPLE_RICH_MEDIA)))
			.then(async () => await response.send(new KeyboardMessage(menuOptions(categories), null, null, null, 3)))

	} catch (error) {
		console.log("postProducts error", error);
	} finally {
		await prisma.$disconnect()
	}

}

bot.on(BotEvents.CONVERSATION_STARTED, (response) => {
	
	try {
		return startButtons(response)
	} catch (err) {
		console.log("BotEvents.CONVERSATION_STARTED error",err);
	}
});

bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
	let data = message?.text.toLowerCase()
	console.count(response.userProfile.name);

	try {
		if (data === "pizzas" || data === "burgers" || data === "pastas") {
			return postProducts(data, categories, response)
		}
		if (data === "menu") {
			return showCategories(categories, response);
		}
		return startButtons(response)
	} catch (error) {
		console.log(error);
	}
});
const port = process.env.PORT || 3000;
//app.use(express.json())
app.use(cors())
app.use("/viber/webhook", bot.middleware());
app.listen(port, () => {
	console.log(`Application running on port: ${port}`);
	bot.setWebhook(`${process.env.EXPOSE_URL}/viber/webhook`).catch(error => {
		console.log('Can not set webhook on following server. Is it running?');
		console.error(error);
		process.exit(1);
	});
});
// npm i -g ngrok
//ngrok http 3000 
//response.send(new KeyboardMessage(menuOptions(buttonArgs), null, null, null, 3));
//response.send(new PictureMessage(url, "this is dniwe", thumbnail,SAMPLE_KEYBOARD));
//const message = new RichMediaMessage(SAMPLE_RICH_MEDIA, [optionalKeyboard], [optionalTrackingData]);
//response.send(new KeyboardMessage(SAMPLE_KEYBOARD));
//response.send(new TextMessage(`Hi there ${response.userProfile.name}`))
//response.send(new UrlMessage("https://upload.wikimedia.org/wikipedia/commons/3/3d/Katze_weiss.png"))