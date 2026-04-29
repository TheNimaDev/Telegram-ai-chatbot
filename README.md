# 🤖 Telegram AI Chatbot - V1.1.0

A smart Telegram chatbot built with **OpenAI**, **Telegraf**, and
**Node.js**.\
It lets users chat with AI models directly inside Telegram and includes
free usage limits, paid plans, MySQL storage, migrations, seeds, and
Zibal payment support.

------------------------------------------------------------------------

## 🚀 Features

-   AI chat inside Telegram
-   Configurable GPT model support
-   Free request limits
-   Paid subscription plans (7, 30, 90 days)
-   MySQL integration for users, plans, and orders
-   Zibal payment gateway integration
-   Automatic database migrations & seeds
-   Clean and scalable project structure

------------------------------------------------------------------------

## ⚙️ Setup

``` bash
git clone https://github.com/TheNimaDev/Telegram-ai-chatbot.git
cd Telegram-ai-chatbot
npm install
```

Create a `.env` file:

``` env
REDIS_URI= # redis uri (redis://localhost:6379)
BOT_TOKEN= # your telegram bot token (get from @Botfather on telegram)
ONE_API_TOKEN= # your oneapi token (get from one-api.ir)
DB_URI= # your db uri (mysql://root:@localhost:3306/chatbot)
FREE_REQUESTS_COUNT= # give a number (5 or 10 or ...)

MERCHANT= # zibal merchant (for test => zibal)
ZIBAL_BASE_API= # zibal base api (https://gateway.zibal.ir)
CALLBACKURL= # your callback_url (https://t.me/yourBotUrl)
```

Run the project:

``` bash
npm run mig
npm run seed
npm run dev
```

------------------------------------------------------------------------
## ⚠️ Important for users in Iran

If you are running this bot from Iran, you **must use a VPN**

---

## 🧾 License
Feel free to use, modify, and share with credit to **[@TheNimaDev](https://github.com/TheNimaDev)** 💜

---
## 💜 
If you like this project, don't forget to give it a ⭐ on GitHub!

---
## 🤝 Contributing

Pull requests and ideas are always welcome!  
If you find a bug or want to improve something, open an issue or PR.

---

**Author:** [@TheNimaDev](https://github.com/TheNimaDev)  
Built with 💻 + ☕ + ❤️
