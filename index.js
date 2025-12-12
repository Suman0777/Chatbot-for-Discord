import { Client, Events, GatewayIntentBits } from 'discord.js';
import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] 
});


const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const model = ai.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

client.on(Events.ClientReady, (readyClient) => {
    console.log(`The client is ready: ${readyClient.user.username}`);
});

client.on("messageCreate", async (message) => {
    if (message.author.bot || !message.content || !message.mentions.users.has(client.user.id)) return;

    try {
        await message.channel.sendTyping();

        const prompt = message.content.replace(/<@!?[0-9]+>/, '').trim();
        if (!prompt) {
            return await message.reply("Hello! How can I help you?");
        }
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        if (responseText.length > 2000) {
            await message.reply(responseText.slice(0, 1990) + "... (message too long)");
        } else {
            await message.reply(responseText);
        }

    } catch (error) {
        console.error("Gemini Error:", error);

        if (error.status === 429 || (error.response && error.response.status === 429)) {
            await message.reply("I'm overwhelmed! I hit my rate limit. Please wait a minute before asking again.");
        } else {
            await message.reply("I encountered an error processing your request.");
        }
    }
});

client.login(process.env.DISCORD_TOKEN);