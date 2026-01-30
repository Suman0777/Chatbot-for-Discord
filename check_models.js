import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    
    console.log("Checking model availability...");
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });
    const result = await model.generateContent("Hello");
    console.log("gemini-2.0-flash is WORKING!");
    
  } catch (error) {
    console.log("Model check failed. Error details:");
    console.log(error.message);
  }
}

listModels();