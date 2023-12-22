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
    const result = await model.generateContent(prompt);
    const response = await result.response;
    console.log('ai --- prompt:' + prompt + ' res: ' + response.text());
    return response.text();
  } catch (error) {
    console.error("Error in chat function:", error);
    return "获取res错误";
  }
}

initModel();