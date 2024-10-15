
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_GEMINI_API_KEY;

// if (!apiKey) {
//   throw new Error('GOOGLE_GEMINI_API_KEY is not set in environment variables');
// }

const genAI = new GoogleGenerativeAI("AIzaSyDlT0-eoTnq_yP-klwvLFiGpv47fWp_gkM");

export async function identifyPlant(imageBase64: string) {
  try {
    // Update the model to gemini-1.5-flash
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Identify this plant and provide its name and some important information about it.";

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBase64
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error('Error in identifyPlant:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to identify plant: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred while identifying the plant');
    }
  }
}