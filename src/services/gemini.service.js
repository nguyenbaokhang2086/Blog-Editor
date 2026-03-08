import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export const askGemini = async (prompt) => {
  const result = await model.generateContent(prompt);
  return result.response.text();
};

export const generateBlogContent = async (topic) => {
  const prompt = `Viết một bài blog chuyên sâu về chủ đề: "${topic}". 
  
  Yêu cầu:
  - Tiêu đề hấp dẫn
  - Mở đầu thôi thúc (hook)
  - Ít nhất 3-4 phần nội dung chính
  - Mỗi phần có tiêu đề phụ rõ ràng
  - Kết luận thuyết phục
  - Tổng độ dài: 1000-1500 từ
  - Viết bằng tiếng Việt
  - Dùng định dạng markdown`;

  return askGemini(prompt);
};

export const generateBlogOutline = async (topic) => {
  const prompt = `Tạo một outline chi tiết cho bài blog về: "${topic}"
  
  Yêu cầu:
  - Tiêu đề bài viết (đủ hấp dẫn)
  - 4-5 phần chính với tiêu đề phụ
  - 2-3 điểm chính cho mỗi phần
  - Gợi ý về tone và cách tiếp cận
  - Viết bằng tiếng Việt`;

  return askGemini(prompt);
};
