import { useEffect, useRef, useState, FormEvent } from "react";

const Dialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const dialogRef = useRef<HTMLDialogElement | null>(null);

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
    <>
      <button
        type="button"
        className="btn btn-info mb-3"
        onClick={(e) => setIsOpen(true)}
      >
        Add a new message
      </button>

      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <form action="/api/messages" method="post" onSubmit={onFormSubmitted}>
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
    </>
  );
};

export default Dialog;
