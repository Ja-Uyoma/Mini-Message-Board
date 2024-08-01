import { Messages } from "./Messages";
import { useState } from "react";

function Button() {
  const [isOpen, setIsOpen] = useState(false);

  const onButtonClicked = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button type="button" onClick={onButtonClicked}>
        Add a new message
      </button>

      <dialog open={isOpen}>
        Add a new message
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
    </>
  );
}

function App() {
  return (
    <main>
      <Messages />
      <Button />
    </main>
  );
}

export default App;
