import { FormEvent, useEffect, useRef, useState } from "react";

import Message, { MessageObject } from "../components/Message";
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
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [text, setText] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    const modal = dialogRef.current;

    if (modal && isOpen) {
      modal.showModal();
    }

    if (modal && !isOpen) {
      modal.close();
    }
  }, [isOpen]);

  const onFormSubmitted = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("text", text);
    formData.append("user", user);

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const result = await res.json();
        console.log("Success: ", result);
        setText("");
        setUser("");
        setIsOpen(false);
      }
    } catch (err) {
      console.error("Request failed: ", err);
      setIsOpen(true);
    }
  };

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

        <button
          type="submit"
          className="btn btn-info mb-3"
          onClick={(e) => setIsOpen(true)}
        >
          Add a new message
        </button>

        <dialog ref={dialogRef} className="modal">
          <div className="modal-box">
            <form
              action="/api/messages"
              method="post"
              onSubmit={onFormSubmitted}
            >
              <div className="my-1">
                <label htmlFor="text" className="form-control w-full max-w-xs">
                  Text
                  <input
                    type="text"
                    name="text"
                    id="text"
                    className="input input-bordered w-full max-w-xs"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                  />
                </label>
              </div>

              <div>
                <label htmlFor="user" className="form-control w-full max-w-xs">
                  User
                  <input
                    type="text"
                    name="user"
                    id="user"
                    className="input input-bordered w-full max-w-xs"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    required
                  />
                </label>
              </div>

              <button type="submit" className="btn btn-info mt-1.5">
                Submit
              </button>
            </form>
          </div>
        </dialog>
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
