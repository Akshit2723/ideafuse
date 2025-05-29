export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ message: "No question provided" });
  }

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`, // Replace with your HF key
      },
      body: JSON.stringify({
        inputs: question,
      }),
    });

    const data = await response.json();

    // The response structure might vary by model!
    const answer = data[0]?.generated_text || "Sorry, no answer found.";
    res.status(200).json({ answer });
  } catch (error) {
    console.error("Hugging Face API error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}
