import React from "react";

import Message, { MessageObject } from "../components/Message";
import Dialog from "../components/Dialog";
import { useLoaderData } from "react-router-dom";

export async function loader() {
  const response = await fetch("/api/messages", { method: "GET" });

  if (response.status >= 400) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

function Root() {
  const messages = useLoaderData() as MessageObject[];

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
            <div className="flex items-center justify-center">
              <p>No messages to display</p>
            </div>
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
