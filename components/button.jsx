import { GoogleGenerativeAI } from "@google/generative-ai";

const api = ({ setText, formData }) => {

    const apiKey = process.env.NEXT_GEMINI_API_KEY;

    const genAI = new GoogleGenerativeAI(apiKey);

    const getContext = async () => {
        try {
          const { trend, section } = formData;
          const model = genAI.getGenerativeModel({ model: "gemini-pro" });
          const prompt = `Why is ${trend} currently trending in the ${section} section on twitter?`;
          const result = await model.generateContent(prompt);
          const response = await result.response;
          const generatedText = response.text();
          setText(generatedText);
        } catch (error) {
          console.error(error);
        }
      };

  return (
    <>
        <button onClick={getContext} disabled={!formData.trend || !formData.section}>
          Get Context
        </button>
    </>
  )
}

export default api