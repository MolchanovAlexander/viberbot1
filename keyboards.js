module.exports = {
    BASE_URL: "https://next-app-branch-mongo.vercel.app",
    SAMPLE_RICH_MEDIA: {
        "ButtonsGroupColumns": 6,
        "ButtonsGroupRows": 1,
        "BgColor": "#1ac1a0",
        Buttons: [ {
            "ActionBody": "back",
            "ActionType": "reply",
            "BgColor": "#9933ff",
            "Text": `<font color=\"#ffffff\"><b>Back to start menu</b></font>`,

            "TextOpacity": 80,
            "Rows": 1,
            "Columns": 6
        }]
    },
    menuRichMedia(args, BASE_URL) {

        return SAMPLE_RICH_MEDIA = {
            "ButtonsGroupColumns": 6,
            "ButtonsGroupRows": 7,
            "BgColor": "#ccccff",
            "Buttons": [
                {
                    "ActionBody": `${BASE_URL}/product/${args.id}`,
                    "ActionType": "reply",
                    "BgMediaType": "picture",
                    "Image": args.img,
                    "BgColor": "#ccccff",
                    "Text": "",
                    "TextOpacity": 60,
                    "Rows": 6,
                    "Columns": 6

                }, {
                    "ActionBody": `${BASE_URL}/product/${args.id}`,
                    "ActionType": "open-url",
                    "BgColor": "#0080ff",
                    "Text": `<font color=\"#ffffff\"><b>${args.title} <br> Price-${args.price}$ </b></font>`,

                    "TextOpacity": 80,
                    "Rows": 1,
                    "Columns": 6
                }
            ]
        }
    },

    START_KEYBOARD: {
        "Type": "keyboard",
        "Revision": 1,
        "BgColor": "#F1F1Fc",
        "Buttons": [
            {
                "Columns": 3,
                "Rows": 2,
                "BgColor": "#9933ff",
                 "BgLoop": true,
                "ActionType": "reply",
                "ActionBody": "menu",
                "Text": "<font color=\"#ffffff\"><b>MENU</b></font>",
                "TextVAlign": "middle",
                "TextHAlign": "center",
                "TextOpacity": 90,
                "TextSize": "regular"
            },
            {
                "Columns": 3,
                "Rows": 2,
                "BgColor": "#9933ff",
                 "BgLoop": true,
                 "ActionType": "open-url",
                 "OpenURLType": "internal",
                 "InternalBrowser": {
                     "Mode": "fullscreen",
                     "CustomTitle": "GUFFF"
                 },
                 "ActionBody": "https://next-app-branch-mongo.vercel.app",
                "Text": "<font color=\"#ffffff\"><b>WebSite</b></font>",
                "TextVAlign": "middle",
                "TextHAlign": "center",
                "TextOpacity": 90,
                "TextSize": "regular"
            },
            

        ]
    },
    menuOptions(args) {
        return CATEGORIES = {
            "Type": "keyboard",
            "Revision": 1,
            "BgColor": "#F1F1Fc",
            "Buttons": args.map((a) => {
                return {
                    "Columns": 2,
                    "Rows": 2,
                    "BgColor": "#FFAAFF",
                    "BgMedia": a.img,
                    "BgMediaType": "picture",
                    "BgLoop": true,
                    "ActionType": "reply",
                    "ActionBody": `${a.title}`,
                    "Text": `<font color=\"${a.color == "white" ? "#ffffff" : "#000000"}\"><b>${a.title}</b></font>`,
                    "TextVAlign": "middle",
                    "TextHAlign": "left",
                    "TextOpacity": 90,
                    "TextSize": "regular"
                }
            })



        }
    },
    CATEGORIES: {
        "Type": "keyboard",
        "Revision": 1,
        "BgColor": "#F1F1Fc",
        "Buttons": [
            {
                "Columns": 2,
                "Rows": 2,
                "BgColor": "#FFAAFF",
                "BgMedia": "https://res.cloudinary.com/dvlngfltj/image/upload/v1698998811/restaurant/dboydu2oj5gtnhlpjgy2.png",
                "BgMediaType": "picture",
                "BgLoop": true,
                "ActionType": "reply",
                "ActionBody": "Yes",
                "Text": "<font color=\"#ffffff\"><b>Pizzas</b></font>",
                "TextVAlign": "middle",
                "TextHAlign": "left",
                "TextOpacity": 90,
                "TextSize": "regular"
            },
            {
                "Columns": 2,
                "Rows": 2,
                "BgColor": "#AFA15F",
                "BgMedia": "https://res.cloudinary.com/dvlngfltj/image/upload/v1698998811/restaurant/mvcgpayrazbflda2dhsl.png",
                "BgMediaType": "picture",
                "BgLoop": true,
                "ActionType": "reply",
                "ActionBody": "Yes",
                "Text": "<font color=\"#000000\"><b>Burgers</b></font>",
                "TextVAlign": "middle",
                "TextHAlign": "left",
                "TextOpacity": 90,
                "TextSize": "regular"
            },
            {
                "Columns": 2,
                "Rows": 2,
                "BgColor": "#AFA15F",
                "BgMedia": "https://res.cloudinary.com/dvlngfltj/image/upload/v1698998811/restaurant/itdxsosa761liw2znmag.png",
                "BgMediaType": "picture",
                "BgLoop": true,
                "ActionType": "reply",
                "ActionBody": "Yes",
                "Text": "<font color=\"#ffffff\"><b>Pastas</b></font>",
                "TextVAlign": "middle",
                "TextHAlign": "left",
                "TextOpacity": 90,
                "TextSize": "regular"
            },

        ]
    }

}