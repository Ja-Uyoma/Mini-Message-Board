import "./App.css";

import React, {useEffect, useState} from "react";

type Message = {
  text: string,
  user: string,
  added: Date
};

function App() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    fetch("/api/messages", { mode: "cors" })
      .then((res) => res.json())
      .then((res) => { setMessages(res); console.log(res); })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      {
        messages.length >= 1 ?  messages.map((msg, idx) => <p key={idx}>{msg.text} {msg.user} {msg.added.toString()} </p> ) : <p>No messages to display</p>
      } 
    </div>
  );
}

export default App;
