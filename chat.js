import { GoogleGenerativeAI } from '@fuyun/generative-ai'

let model = null;

function initModel() {
  if (!model) {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY, process.env.GOOGLE_API_URL);
    model = genAI.getGenerativeModel({ model: "gemini-pro"});
  }
}

export async function chat(prompt) {
  if (!model) {
    initModel();
  }

  try {
    console.log(prompt)
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text(); // 或者 response.json()，取决于响应格式
  } catch (error) {
    console.error("Error in chat function:", error);
    return "获取res错误";
  }
}

initModel();