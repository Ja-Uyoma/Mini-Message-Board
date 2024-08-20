import Message, { MessageObject } from "./Message";
import NetworkError from "./NetworkError";
import Loading from "./Loading";
import { useState, useEffect } from "react";

export function Messages() {
  const [messages, setMessages] = useState<MessageObject[]>([]);
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
