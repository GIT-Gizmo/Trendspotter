'use client'

import { useState } from "react";
import Button from '@components/button'

const Home = () => {
  const [formData, setFormData] = useState({
    trend: '',
    section: '',
  });
  const [text, setText] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
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
        <Button setText={setText} formData={formData} />
      </section>
      <section>{text}</section>
    </main>
  );
};

export default Home;