import { useState } from "react";

export default function Chatbot() {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = async () => {
    if (!question) return;

    // Call your API route (which we'll create next!)
    const res = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });

    const data = await res.json();
    setResponse(data.answer);
  };

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <input
        type="text"
        placeholder="Ask a question..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{ width: "300px", padding: "8px" }}
      />
      <button
        onClick={handleAsk}
        style={{
          marginLeft: "10px",
          padding: "8px 12px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Ask
      </button>

      <div style={{ marginTop: "20px" }}>
        {response && <p><strong>Response:</strong> {response}</p>}
      </div>
    </div>
  );
}
