import { Messages } from "./Messages";
import Dialog from "./Dialog";

function App() {
  return (
    <div>
      <header>
        <h1>Mini Message Board</h1>
      </header>
      <main>
        <Messages />
        <Dialog />
      </main>
      <footer>
        <p>Copyright &copy; 2023 Mini Message Board. Created By Jimmy Givans</p>
      </footer>
    </div>
  );
}

export default App;
