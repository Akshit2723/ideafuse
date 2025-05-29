import { useState } from "react";

export default function Chatbot() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question) return;
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setResponse(data.answer || "Sorry, I am still trying to find an Answer(Ak is on it).");
    } catch (error) {
      setResponse("Oops! Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbox">
      <input
        type="text"
        placeholder="Type your question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAsk()}
      />
      <button onClick={handleAsk}>Ask</button>
      <div className="response">
        {loading ? "Loading..." : response}
      </div>
      <style jsx>{`
        .chatbox {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          margin-top: 30px;
        }
        input {
          width: 300px;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        button {
          background-color: #4caf50;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
        }
        .response {
          margin-top: 20px;
          font-size: 1rem;
          color: #333;
          min-height: 1.2rem;
        }
      `}</style>
    </div>
  );
}
