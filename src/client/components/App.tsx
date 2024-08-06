import { Messages } from "./Messages";
import Dialog from "./Dialog";

function App() {
  return (
    <div>
      <header className="my-3">
        <h1 className="text-2xl">Mini Message Board</h1>
      </header>
      <main>
        <Messages />
        <Dialog />
      </main>
      <footer className="footer footer-center bg-base-300 text-base-content p-4">
        <aside>
          <p>
            Copyright &copy; 2023 Mini Message Board. Created By Jimmy Givans
          </p>
        </aside>
      </footer>
    </div>
  );
}

export default App;
