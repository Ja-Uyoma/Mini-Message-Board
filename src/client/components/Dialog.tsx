import { useEffect, useRef, useState } from "react";

function Dialog() {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const onClickHandler = () => {
    setIsOpen(!isOpen);
  };

  const onEscapeKeyPressed = (
    event: React.KeyboardEvent<HTMLDialogElement>
  ) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const dialogElem = dialogRef.current;

    if (dialogElem && isOpen) {
      dialogElem.showModal();
    }

    if (dialogElem && !isOpen) {
      dialogElem.close();
    }
  }, [isOpen]);

  return (
    <div>
      <button type="button" onClick={onClickHandler} className="btn btn-info">
        Add a new message
      </button>

      <dialog ref={dialogRef} onKeyDown={onEscapeKeyPressed} className="modal">
        <div className="modal-box">
          <form action="/api/messages" method="post">
            <div className="my-1">
              <label htmlFor="text" className="form-control w-full max-w-xs">
                Text
                <input
                  type="text"
                  name="text"
                  id="text"
                  className="input input-bordered w-full max-w-xs"
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
                />
              </label>
            </div>

            <button type="submit" className="btn btn-info mt-1.5">
              Submit
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Dialog;
