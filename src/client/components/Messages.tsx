import { z } from "zod";
import { useState, useEffect } from "react";

const MessageSchema = z.object({
  text: z.string(),
  user: z.string(),
  added: z.string().date(),
});

type Message = z.infer<typeof MessageSchema>;

function Message({ text, user, added }: Message) {
  return (
    <div className="bg-gray-100 rounded my-5 p-3">
      <p className="text-lg">{text}</p>
      <div className="flex justify-between mt-3">
        <p className="text-sm">
          From: <span className="font-medium">{user}</span>
        </p>
        <p className="text-sm">{added}</p>
      </div>
    </div>
  );
}

function NetworkError() {
  return (
    <div>
      <p>A network error was encountered</p>
    </div>
  );
}

function Loading() {
  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}

export function Messages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/messages")
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(res.statusText);
        } else {
          return res.json();
        }
      })
      .then((messages) => {
        setMessages(messages);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (error) {
    return <NetworkError />;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {messages.length >= 1 ? (
        messages.map((msg, idx) => (
          <Message
            key={idx}
            text={msg.text}
            user={msg.user}
            added={msg.added}
          />
        ))
      ) : (
        <p>No messages to display</p>
      )}
    </div>
  );
}
