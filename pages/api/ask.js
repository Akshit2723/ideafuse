export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ message: "No question provided" });
  }

  try {
    const apiKey = process.env.OPENAI_API_KEY;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: question },
        ],
      }),
    });

    const data = await response.json();

    // Defensive check for errors or missing choices
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("OpenAI API error or unexpected response:", data);
      return res.status(500).json({ message: "Failed to get answer from AI", error: data });
    }

    const answer = data.choices[0].message.content;
    res.status(200).json({ answer });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}
