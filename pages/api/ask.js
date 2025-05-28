
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
          { role: "system", content: "You are a helpful assistant that answers questions directly and concisely." },
          { role: "user", content: question },
        ],
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("OpenAI API Error:", data.error);
      return res.status(500).json({ message: "Error from OpenAI API", error: data.error });
    }

    const answer = data.choices[0].message.content;
    res.status(200).json({ answer });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
}
