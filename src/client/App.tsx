import "./App.css";

import React, {useEffect, useState} from "react";

type Message = {
  text: string,
  user: string,
  added: Date
};

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/messages", { mode: "cors" })
      .then((res) => { if (res.status >= 400) { throw new Error("Internal server error"); } return res.json(); })
      .then((res) => { setMessages(res); console.log(res); })
      .catch((err) => setError(err));
  }, []);

  if (error) {
    return <p>A network error was encountered</p>;
  }

  return (
    <div className="App">
      {
        messages.length >= 1 ?  messages.map((msg, idx) => <p key={idx}>{msg.text} {msg.user} {new Date(msg.added).toLocaleDateString()} </p> ) : <p>No messages to display</p>
      } 
    </div>
  );
}

export default App;
