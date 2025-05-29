export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ message: "No question provided" });
  }

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/google/flan-t5-large", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      },
      body: JSON.stringify({
        inputs: question,
      }),
    });

    const data = await response.json();
    console.log("API response:", data);

    let answer = "Sorry, no answer found.";
    if (Array.isArray(data)) {
      answer = data[0]?.generated_text || answer;
    } else if (data.generated_text) {
      answer = data.generated_text;
    }

    res.status(200).json({ answer });
  } catch (error) {
    console.error("Hugging Face API error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}
