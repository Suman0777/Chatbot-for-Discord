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
        if (!prompt) return await message.reply("Hello! How can I help you?");
        
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        if (responseText.length <= 2000) {
            await message.reply(responseText);
        } else {
            const chunkSize = 1900;
            for (let i = 0; i < responseText.length; i += chunkSize) {
                const chunk = responseText.slice(i, i + chunkSize);
                if (i === 0) {
                    await message.reply(chunk);
                } else {
                    await message.channel.send(chunk);
                }
            }
        }

    } catch (error) {
        console.error("Bot Error:", error.message);
        if (error.code === 50035) {
             await message.channel.send("The response was too large for Discord to handle.");
        } else {
             await message.channel.send("An error occurred while processing your request.");
        }
    }
});

client.login(process.env.DISCORD_TOKEN);