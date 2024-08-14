import React from "react";

import Message from "../components/Message";
import Dialog from "../components/Dialog";
import NetworkError from "../components/NetworkError";
import Loading from "../components/Loading";

function Root() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [error, setError] = React.useState<Error | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("/api/messages", { method: "GET" });

        if (response.status >= 400) {
          throw new Error(response.statusText);
        } else {
          const result = await response.json();
          setMessages(result);
        }
      } catch (err) {
        console.error(err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (error) {
    return <NetworkError />;
  } else if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="my-3">
        <h1 className="text-2xl text-center">Mini Message Board</h1>
      </header>
      <main className="w-2/4 my-0 mx-auto">
        <h2 className="text-xl">Messages</h2>

        <>
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
        </>

        <Dialog />
      </main>
      <footer className="footer footer-center bg-base-300 text-base-content p-4 mt-auto">
        <aside>
          <p>
            Copyright &copy; 2023 Mini Message Board. Created By Jimmy Givans
          </p>
        </aside>
      </footer>
    </div>
  );
}

export default Root;
