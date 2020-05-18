import React, { useState, useEffect } from 'react';
import '../App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

import { queryWit } from '../routes/wit';

function TextInput(props) {

    const [counter, setCounter] = useState(0);
    const [message, setMessage] = useState("");

    let addMessage = (e) => {
        if (e) e.preventDefault();
        if (message == "") return;
        props.setMessages([...props.messages, { 'text': message, 'align': 1 }]);
        setCounter(counter + 1);
        setMessage("");
    }

    useEffect(() => {
        if (counter > 0) {
            console.log("query: ", props.messages.slice(-1).pop().text);
            queryWit(props.messages.slice(-1).pop().text)
                .then(res => {
                    console.log(res);
                    let text = res.data;
                    props.setMessages([...props.messages, { 'text': text, 'align': 0 }]);
                })
                .catch(err => console.error(err));
        }
    }, [counter])

    return (
        <div className="text-input-row">
            <Form onSubmit={addMessage}>
                <Form.Group as={Row} style={{marginBottom:"0"}}>
                    <Col sm={10}>
                        <Form.Control type="text" placeholder="Type Message..." value={message} onChange={(e) => setMessage(e.target.value)} />
                    </Col>
                    <Col sm={2}>
                        <Button style={{ width: "100%" }} onClick={addMessage} disabled={message == ""}><FontAwesomeIcon icon={faPaperPlane} /></Button>
                    </Col>
                </Form.Group>
            </Form>
        </div>
    )
}

export default TextInput;