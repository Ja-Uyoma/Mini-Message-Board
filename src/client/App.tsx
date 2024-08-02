import { Messages } from "./Messages";
import { useState } from "react";

function Form() {
  return (
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
  );
}

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
        <Form />
      </dialog>
    </>
  );
}

function App() {
  return (
    <>
      <header>
        <h1>Mini Message Board</h1>
      </header>
      <main>
        <Messages />
        <Button />
      </main>
      <footer>
        <p>Copyright &copy; 2023 Mini Message Board. Created By Jimmy Givans</p>
      </footer>
    </>
  );
}

export default App;
