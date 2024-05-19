import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

const handler = async (req, res) => {
    try {
        const { trend, section } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `Why is ${trend} currently trending in the ${section} section on twitter?`;
        const result = await model.generateContent(prompt);
        const response = result.response;
        const generatedText = response.text();
        console.log(generatedText);
        res.status(200).json(generatedText);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error generating text");
    }
};

export default handler;