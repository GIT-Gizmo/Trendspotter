'use client'

import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

const apiKey = process.env.NEXT_GEMINI_API_KEY;

const Home = () => {
  const [formData, setFormData] = useState({
    trend: '',
    section: '',
  });
  const [text, setText] = useState('');

  const genAI = new GoogleGenerativeAI(apiKey);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

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
    <main>
      <section>
        <input
          type="text"
          name="trend"
          value={formData.trend}
          onChange={handleChange}
          placeholder="Trending topic"
        />
        <input
          type="text"
          name="section"
          value={formData.section}
          onChange={handleChange}
          placeholder="Topic section"
        />
        <button onClick={getContext} disabled={!formData.trend || !formData.section}>
          Get Context
        </button>
      </section>
      <section>{text}</section>
    </main>
  );
};

export default Home;




