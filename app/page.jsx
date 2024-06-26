'use client'

import { useState } from "react";

import { Input } from "@components/ui/input"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@components/ui/card"
import Button from "@components/Context"

const Home = () => {
  const [formData, setFormData] = useState({
    trend: '',
    section: '',
  });
  const [generatedText, setGeneratedText] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // const fetchContext = async () => {
  //   setIsFetching(true);
  //   setGeneratedText('');

  //   try {
  //     const response = await fetch("/api/context", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });
      
  //     if (response.ok) {
  //       const data = await response.json();
  //       setGeneratedText(data.text)
  //       console.log(data);
  //     } 
  //     else {
  //       throw new Error("Failed to fetch context");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching context:", error);
  //   } finally {
  //     setIsFetching(false);
  //   }
  // }

  return (
  <main className="w-full">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Understand Twitter Trends
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Get context on the latest Twitter trends with our AI-powered analysis.
                </p>
              </div>
              <div className="grid gap-4">
                <div className="flex space-x-2">
                  <Input
                    className="flex-1"
                    placeholder="Enter a trending topic"
                    type="text" 
                    name="trend"
                    value={formData.trend}
                    onChange={handleChange}
                  />
                  <Input
                    className="flex-1"
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    placeholder="Enter a topic section" type="text"
                  />
                </div>
                <Button
                  setGeneratedText={setGeneratedText}
                  formData={formData}
                />
                {/* {isFetching ? (
                  <Button className="flex items-center gap-2" disabled={isFetching}>Fetching Context...<Spinner /></Button>
                  ) : (
                  <Button
                    onClick={fetchContext}
                    disabled={!formData.trend || !formData.section}
                  >
                    Generate Context
                  </Button>
                  )
                } */}
              </div>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <Card className="h-full w-full">
                <CardHeader>
                  <CardTitle>Trending Topic Context</CardTitle>
                  <CardDescription>Gemini AI will analyze the latest trending topic and provided context.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-bold">Trending Topic</h3>
                      <p className="text-gray-500 dark:text-gray-400">#{formData.trend}</p>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">Context</h3>
                        <div className="relative before:absolute before:left-0 before:top-0 before:text-gray-400 before:opacity-60 before:content-[attr(data-placeholder)] text-gray-500 dark:text-gray-400 border border-gray-800 rounded-md p-2 w-full min-h-40 h-fit placeholder:text-gray-500" data-placeholder="Context will appear here">
                          {generatedText}
                        </div>
                      {/* {isFetching ? (
                        <p className="text-gray-500 dark:text-gray-400"><Spinner /></p>
                        ) : (
                          <p className="text-gray-500 dark:text-gray-400" placeholder="Context will appear here">
                          {generatedText}
                          </p>
                        )
                      } */}
                    </div>
                    {/* <div>
                      <h3 className="text-lg font-bold">Sentiment</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        The overall sentiment around the #{formData.trend} hashtag is positive, as users are generally
                        excited about the platform improvements.
                      </p>
                    </div> */}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home