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
    const getter = async () => {
      try {
        const res = await fetch("/api/messages");
        const data = await res.json();
        console.log(data);
        setMessages(data);
      }
      catch (err) {
        console.error(err);
      }
    };

    getter();
  }, []);

  return (
    <div className="App">
      {
        messages.length >= 1 ?  messages.map((msg, idx) => <p key={idx}>This is a message</p> ) : <p>No messages to display</p>
      } 
    </div>
  );
}

export default App;
