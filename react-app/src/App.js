import React, { useState } from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

import Messages from './components/Messages';
import TextInput from './components/TextInput';

function App() {
  const [messages, setMessages] = useState([{ 'text': 'Hello! Try asking me things like "what frontend skills do you have?"', 'align': 0 }]);

  return (
    <Container>
      <div className="chatbox">
        <div className="title">
          <div className="name">
            <span>Tony Zhang Chatbot AI v1.0</span>
          </div>
        </div>
        <div className="content">
          <Messages messages={messages} />
          <TextInput messages={messages} setMessages={setMessages} />
        </div>
      </div>
    </Container >
  );
}

export default App;
