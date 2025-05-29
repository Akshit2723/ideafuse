export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Extract question from request body
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ message: "No question provided" });
  }

  try {
    // Call Hugging Face API
    const response = await fetch("https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      },
      body: JSON.stringify({
        inputs: `Provide two perspectives on this question:\n1. From a car enthusiast.\n2. From a budget minimalist.\nQuestion: ${question}`,
      }),
    });

    const data = await response.json();

    console.log("Hugging Face API response:", data);

    // Parse response - handle if it's an array or direct generated_text
    let answer = "Sorry, no answer found.";
    if (Array.isArray(data)) {
      answer = data[0]?.generated_text || answer;
    } else if (typeof data.generated_text === "string") {
      answer = data.generated_text;
    }

    res.status(200).json({ answer });
  } catch (error) {
    console.error("Hugging Face API error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}
