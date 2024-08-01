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
    <div>
      {text} {user} {added}
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
    return (
      <div>
        <p>A network error was encountered</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
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
