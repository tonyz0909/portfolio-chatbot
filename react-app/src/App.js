import React, { useState } from 'react';
import './App.css';
import Container from '@material-ui/core/Container';

import ChatBar from './components/ChatBar';
import Messages from './components/Messages';
import TextInput from './components/TextInput';

function App() {
  const [messages, setMessages] = useState([{ 'text': 'Hello! Try asking me things like "what frontend skills do you have?"', 'align': 0 }]);

  const [loading, setLoading] = useState(false);

  return (
    <Container maxWidth="xs" fixed>
      <div className="chatbox">
        <ChatBar/>
        <div className="content">
          <Messages messages={messages} isLoading={loading}/>
          <TextInput messages={messages} setMessages={setMessages} setLoading={setLoading}/>
        </div>
      </div>
    </Container >
  );
}

export default App;
