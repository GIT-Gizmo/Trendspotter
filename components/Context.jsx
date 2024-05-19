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
          if (!trend || !section) alert("Please type in a trending topic and a section");
          const model = genAI.getGenerativeModel({ model: "gemini-ultra" });
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
                <Button className="dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-gray-100" onClick={getContext}>
                    Get Context
                </Button>
            )
        }
        
    </>
  )
}

export default Context