# **Discord Gemini Chatbot**

A powerful, lightweight Discord bot integrated with **Google's Gemini 1.5 Flash** model.
This bot works as an intelligent assistant capable of handling conversational queries efficiently while respecting Discord limitations such as message limits and mention requirements.

---

## 🚀 **Key Features**

* **AI-Powered Responses**
  Powered by `gemini-2.5-flash-lite` for fast, accurate, and low-latency replies.

* **Mention-Based Triggering**
  Bot responds **only when mentioned** (`@chitchat`), reducing spam and saving API quota.

* **Smart Message Splitting**
  Automatically splits long responses (over 2000 characters) into multiple clean messages.

* **Input Cleanup**
  Removes mentions and unnecessary tags to deliver clearer prompts to the AI.

* **Error Handling**
  Includes specific handling for:

  * Rate limits (429)
  * Model/API errors
  * Network issues
    Ensures stable performance even during failures.

---
## **⚠️Aleart**

* **Make sure to create the .env file and add the gimini api and the discord token. And you are ready to make the project live and also don't forget to download the `dotenv` file by the npm page `npm i dotenv`**
---

## 🛠️ **Tech Stack**

* **Node.js** 
* **discord.js (v14+)** `npm i discord.js`
* **Google Generative AI SDK (`@google/generative-ai`)** `npm i @google/generative-ai`
* **dotenv** (for safe secret management) `npm i dotenv`

---

## 📦 **Installation**

### **1. Clone the Repository**

```bash
git clone https://github.com/your-username/discord-gemini-chat.git
cd discord-gemini-chat
```

### **2. Install Dependencies**

```bash
npm install
```

Make sure the Google SDK is up to date:

```bash
npm install @google/generative-ai@latest
```

---

## 🔧 **Configuration**

Create a `.env` file in the **root directory**:

```
DISCORD_TOKEN=your_discord_bot_token_here
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## ▶️ **Start the Bot**

```bash
node index.js
```

---

## 📝 **Usage**

Mention the bot in any channel:

```
User: @BotName Explain binary search in simple words.
Bot: (Provides detailed explanation...)
```

If the response is long, the bot automatically sends it in multiple well-structured messages.

---

## 🤝 **Contributing**

Contributions are welcome!
Feel free to fork the repo, open issues, or submit pull requests.

---
