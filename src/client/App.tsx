import React, {useEffect, useState} from "react";
import type { Message } from "./Message.type";

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/messages", { mode: "cors" })
      .then((res) => { if (res.status >= 400) { throw new Error("Internal server error"); } return res.json(); })
      .then((res) => { setMessages(res); console.log(res); })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (error) {
    return <p>A network error was encountered</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      {
        messages.length >= 1 ?  messages.map((msg, idx) => <Message text={msg.text} user={msg.user} added={msg.added} />) : <p>No messages to display</p>
      } 
    </div>
  );
}

function Message({ text, user, added }: Message) {
  return (
    <div>
      {text} {user} {added}
    </div>
  );
}

export default App;
