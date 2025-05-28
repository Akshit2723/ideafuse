export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { question } = req.body;

  // Call OpenAI or Perplexity here
  const answer = await getAIResponse(question);

  res.status(200).json({ answer });
}

async function getAIResponse(question) {
  // Example using OpenAI API
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
  return data.choices[0].message.content;
}
