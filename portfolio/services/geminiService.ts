import { GoogleGenAI } from "@google/genai";
import { RESUME_TEXT } from '../constants';

// Initialize the Gemini API client
// Note: In a production environment, you should handle the API key more securely 
// or proxy requests through a backend.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

export const generateChatResponse = async (userMessage: string): Promise<string> => {
  if (!apiKey) {
    return "I'm sorry, I cannot answer right now because the API key is missing from the environment configuration.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: `You are a helpful and professional AI assistant for Aditya Agarwal's portfolio website. 
        Your goal is to answer questions about Aditya's professional background, skills, and experience based strictly on the provided resume context below.
        
        RESUME CONTEXT:
        ${RESUME_TEXT}
        
        GUIDELINES:
        - Be concise and friendly.
        - Speak in the first person ("I") as if you are Aditya's digital avatar, OR in third person referring to him as Aditya. Let's stick to third person "Aditya" for clarity.
        - If the answer is not in the context, politely say you don't have that information.
        - Highlight key achievements like "Agentic systems" or "RAG pipelines" when relevant.
        `,
      }
    });

    return response.text || "I didn't catch that. Could you try asking again?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my brain right now. Please try again later.";
  }
};
