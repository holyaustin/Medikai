import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from "../components/Header";
const Symptom = () => {
  const navigate = useRouter();
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('');
const [isGenerating, setIsGenerating] = useState(false);



const callGenerateEndpoint = async () => {
  setIsGenerating(true);

  const url = process.env.VERCEL_URL
console.log("url is", url)
  
  console.log("Calling OpenAI..."); 
  //const response = await fetch("http://" +  process.env.VERCEL_URL + "/api/generate", {
  // const response = await fetch(`http://localhost:3000/api/generate`, {
  const response = await fetch(`/api/generate`, {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied...", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}

const getAbstract = async () => {
  console.log("Calling Abstract...");

navigate.push('/drugs');
}

  const onUserChangedText = (event) => {
    console.log(event.target.value);
    setUserInput(event.target.value);
  };
  return (
    <>
    <Header />
    <div className="root">
      <div className="container2">
        <div className="header">
          <div className="header-title">
            <h1>AI - Disease Diagnosis</h1>
          </div>
          <div className="header-subtitle">
            <h2>Get your symptoms checked</h2>
          </div>
        </div>
       
        <div className="prompt-container">
        <textarea
  className="prompt-box"
  placeholder="start by typing your symptoms"
  value={userInput}
  onChange={onUserChangedText}
/>;

  <div className="prompt-buttons">
  <a
    className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}
  >
    <div className="generate">
    {isGenerating ? <span className="loader"></span> : <p>Diagnose</p>}
    </div>
  </a>
</div>

  {/* New code I added here */}
  {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>List of Ailments</h3>
      </div>
    </div>

    <div className="output-content">
      <p>{apiOutput}</p>

      <div className="prompt-buttons2">
  <a
    className="generate-button2"
    onClick={getAbstract}
  >
    <div className="generate">
   <p>Get Drugs and remedies for any selected ailment above</p>
    </div>
  </a>
</div>

    </div>
    {/**
    <div className="output-header">
        <h2>Summary of Topics Listed</h2>
      </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
     */}
  </div>
)}

  {/* New code I added here */}


        </div>
      </div>

    </div>
    </>
  );
};

export default Symptom;
