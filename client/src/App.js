
import './App.css';
import { useState, useEffect } from "react";


function App() {
  const [prompt, updatePrompt] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState(undefined);
  
  useEffect(() => {
    if (prompt != null && prompt.trim() === "") {
      setAnswer(undefined);
    }
  }, [prompt]);

  const sendPrompt = async (event) => {
    if (event.key !== "Enter") {
      return;
    }
    try {
      setLoading(true);
  
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      };
  
      const res = await fetch("/ask", requestOptions);
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
  
      const { message } = await res.json();
      setAnswer(message);
    } catch (err) {
      console.error(err, "err");
    } finally {
      setLoading(false);
    }
    
  }
  return (
    <div className="App">
      <input type='text'
        disabled={loading}
        onChange={(e) => updatePrompt(e.target.value)}
        onKeyDown={(e) => sendPrompt(e)}
      ></input>
      <button onClick={(e)=>{sendPrompt(e)}}> Send</button>
      <div>Answer: {answer && <p>{answer}</p>}</div>
    </div>
  );
}

export default App;
