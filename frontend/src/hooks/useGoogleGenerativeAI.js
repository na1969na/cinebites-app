import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GOOGLE_GEMINI_API_KEY
);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateContent = async (genre) => {
  const prompt = `Suggest ten snack ideas that pairs well with the movie genre, ${genre}. The snack should be easy to prepare at home and visually appealing. Include a catchy name, a short description, the main ingredients, and a detailed recipe. Provide the output in the following JSON format, without any extra text: { "snackName": "Snack Name", "description": "Short description of the snack.", "ingredients": ["List of main ingredients"], "recipe": ["Step 1: Description of the first step.", "Step 2: Description of the second step.", "Step 3: Description of the third step."]}`;
  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  const jsonData = extractAndParseJSON(result.response.text());
  return jsonData;
};

const extractAndParseJSON = (response) => {
  try {
    // 正規表現でJSON部分を抽出
    const match = response.match(/```json\n([\s\S]*?)\n```/);
    if (match && match[1]) {
      const parsedData = JSON.parse(match[1]);
      console.log(parsedData);
      return parsedData;
    } else {
      console.error("JSON部分が見つかりません");
    }
  } catch (error) {
    console.error("JSONのパースに失敗:", error);
  }
};
