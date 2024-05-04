'use client'

import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { Button } from "@components/ui/button"
import Spinner from "@components/ui/spinner";

const Context = ({ setGeneratedText, formData }) => {
    const [isFetching, setIsFetching] = useState(false);

    const apiKey = process.env.NEXT_GEMINI_API_KEY;

    const genAI = new GoogleGenerativeAI(apiKey);

    const getContext = async () => {
        try {
          setIsFetching(true);
          const { trend, section } = formData;
          const model = genAI.getGenerativeModel({ model: "gemini-pro" });
          const prompt = `Why is ${trend} currently trending in the ${section} section on twitter?`;
          const result = await model.generateContent(prompt);
          const response = await result.response;
          const generatedText = response.text();
          setGeneratedText(generatedText);
        } catch (error) {
          console.error(error);
        } finally {
          setIsFetching(false);
        }
      };

  return (
    <>
        {isFetching ? (
                <Button className="flex items-center gap-2" disabled={isFetching}>
                    Fetching Context...<Spinner />
                </Button> ) : (
                <Button onClick={getContext} disabled={!formData.trend || !formData.section}>
                    Get Context
                </Button>
            )
        }
        
    </>
  )
}

export default Context