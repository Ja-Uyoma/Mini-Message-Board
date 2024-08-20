import { useLoaderData, Link } from "react-router-dom";
import Message, { MessageObject } from "./Message";

export async function loader() {
  const response = await fetch("/api/messages", { method: "GET" });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export function ViewMessages() {
  const messages = useLoaderData() as MessageObject[];

  return (
    <>
      {messages.length >= 1 ? (
        messages.map((msg, idx) => (
          <div key={idx} className="mb-4">
            <Message
              key={idx}
              text={msg.text}
              user={msg.user}
              added={msg.added}
            />
            <Link to={`/messages/${idx + 1}`} className="btn btn-info">
              View Message
            </Link>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center">
          <p>No messages to display</p>
        </div>
      )}
    </>
  );
}
