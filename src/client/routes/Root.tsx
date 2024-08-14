import { Messages } from "../components/Messages";
import Dialog from "../components/Dialog";

function Root() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="my-3">
        <h1 className="text-2xl text-center">Mini Message Board</h1>
      </header>
      <main className="w-2/4 my-0 mx-auto">
        <h2 className="text-xl">Messages</h2>
        <Messages />
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
