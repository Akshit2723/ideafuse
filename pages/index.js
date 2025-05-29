import Head from "next/head";
import Chatbot from "../components/Chatbot";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>IdeaFuse 🌟</title>
      </Head>

      <main>
        <h1>Welcome to IdeaFuse 🚀</h1>
        <p>Where worldviews collide and ideas fuse!</p>
        <Chatbot />
      </main>

      <style jsx>{`
        .container {
          text-align: center;
          font-family: Arial, sans-serif;
          padding: 40px;
        }
        main {
          margin-top: 20px;
        }
        h1 {
          font-size: 2.5rem;
        }
        p {
          font-size: 1.2rem;
          color: #555;
        }
      `}</style>
    </div>
  );
}
