import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from "../components/Header";

const Drugs = () => {
    const navigate = useRouter();
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...");
  const response = await fetch('/api/generate2', {
    method: 'POST',
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

const getBack = async () => {
    console.log("Calling GetBack...");
  
  navigate.push('/');
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
            <h1>Drug Prescriptor</h1>
          </div>
          <div className="header-subtitle">
            <h2>Get drugs for the ailment identified</h2>
          </div>
        </div>
        {/* Add this code here*/}
        <div className="prompt-container">
        <textarea
  className="prompt-box"
  placeholder="Enter your preferred ailment here"
  value={userInput}
  onChange={onUserChangedText}
/>;
  {/* New code I added here */}
  <div className="prompt-buttons">
  <a
    className={isGenerating ? 'generate-button loading' : 'generate-button'}
    onClick={callGenerateEndpoint}
  >
    <div className="generate">
    {isGenerating ? <span className="loader"></span> : <p>Generate</p>}
    </div>
  </a>
</div>

  {/* New code I added here */}
  {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Solution</h3>
      </div>
    </div>

    <div className="output-content">
      <p>{apiOutput}</p>

      <div className="prompt-buttons2">
  <a
    className="generate-button2"
    onClick={getBack}
  >
    <div className="generate">
   <p>Get Back to Home Page</p>
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

export default Drugs;
