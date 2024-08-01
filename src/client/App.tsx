import { Messages } from "./Messages";

function Button() {
  return <button type="button">Add a new message</button>;
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
