import React, { useState, useEffect } from 'react';
import '../App.css';
// import Button from 'react-bootstrap/Button';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Form from 'react-bootstrap/Form';
import SendIcon from '@material-ui/icons/Send';
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
            props.setLoading(true);
            queryWit(props.messages.slice(-1).pop().text)
                .then(res => {
                    console.log(res);
                    let text = res.data;
                    props.setLoading(false);
                    props.setMessages([...props.messages, { 'text': text, 'align': 0 }]);
                })
                .catch(err => console.error(err));
        }
    }, [counter])

    return (
        <div className="text-input-row">
            <Form onSubmit={addMessage}>
                {/* <Form.Group as={Row} style={{ marginBottom: "0" }}>
                    <Col sm={10}>
                        <TextField label="Type Message..." value={message} onChange={(e) => setMessage(e.target.value)} />
                    </Col>
                    <Col sm={2}>
                        <Button variant="contained" color="primary" size="large" fullWidth onClick={addMessage} disabled={message == ""}><FontAwesomeIcon icon={faPaperPlane} /></Button>
                    </Col>
                </Form.Group> */}
                <Grid container spacing={3}>
                    <Grid item xs={10}>
                        <Input fullWidth placeholder="Type Message..." value={message} onChange={(e) => setMessage(e.target.value)}/>
                    </Grid>
                    <Grid item xs={2}>
                        <Button color="primary" fullWidth onClick={addMessage} style={{"outline":"none"}} ><SendIcon/></Button>
                    </Grid>
                </Grid>
            </Form>
        </div>
    )
}

export default TextInput;