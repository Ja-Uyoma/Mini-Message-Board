import { useEffect, useRef, useState } from "react";
import Form from "./Form";

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
      <button
        type="button"
        onClick={onClickHandler}
        className="btn btn-info mb-3"
      >
        Add a new message
      </button>

      <dialog ref={dialogRef} onKeyDown={onEscapeKeyPressed} className="modal">
        <div className="modal-box">
          <Form />
        </div>
      </dialog>
    </div>
  );
}

export default Dialog;
