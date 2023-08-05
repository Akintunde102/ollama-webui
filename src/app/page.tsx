"use client"

import React, { useState, ChangeEvent, FormEvent, use } from 'react';
import axios from 'axios';

const MyForm: React.FC = () => {
  const [model, setModel] = useState<string>('llama2-uncensored');
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleModelChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setModel(e.target.value);
  };

  const handlePromptChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const requestData = {
      model: model,
      prompt: prompt,
    };

    try {
      setResponse("")
      setLoading(true);
      const response = await axios.post('http://localhost:3000/generate-data', requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setLoading(false);

      setResponse(response.data.response);
    } catch (error) {
      setLoading(false);
      console.error('Error:', (error as any).message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 bg-white p-6 shadow-md">
          <div className="mb-4 max-w-md">
            <label htmlFor="model" className="block text-gray-700 font-bold mb-2">
              Model:
            </label>
            <select
              id="model"
              value={model}
              onChange={handleModelChange}
              className="px-3 py-4 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-base border-0 shadow outline-none focus:outline-none focus:ring w-full"
            >
              <option value="llama2-uncensored">llama2-uncensored</option>
              <option value="llama2">llama2</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="prompt" className="block text-gray-700 font-bold mb-2">
              Prompt:
            </label>
            <input
              type="text"
              id="prompt"
              value={prompt}
              onChange={handlePromptChange}
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit {loading ? "....loading" : ""}
          </button>

          {response && (
            <div className="mt-4">
              <h2 className="text-lg font-bold mb-2">Response:</h2>
              <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{JSON.stringify(response, null, 2)}</pre>
            </div>
          )}
        </form>
      </div>
    </main>

  );
};

export default MyForm;