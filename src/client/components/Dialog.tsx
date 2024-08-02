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
      <button type="button" onClick={onClickHandler}>
        Add a new message
      </button>

      <dialog ref={dialogRef} onKeyDown={onEscapeKeyPressed}>
        <form action="/api/messages" method="post">
          <div>
            <label htmlFor="text">Text</label>
            <input type="text" name="text" id="text" />
          </div>

          <div>
            <label htmlFor="user">User</label>
            <input type="text" name="user" id="user" />
          </div>

          <button type="submit">Submit</button>
        </form>
      </dialog>
    </div>
  );
}

export default Dialog;
