import React, { useState, useEffect } from 'react';
import '../App.css';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';

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
            // console.log("query: ", props.messages.slice(-1).pop().text);
            props.setLoading(true);
            queryWit(props.messages.slice(-1).pop().text)
                .then(res => {
                    let text = res.data;
                    props.setLoading(false);
                    props.setMessages([...props.messages, { 'text': text, 'align': 0 }]);
                })
                .catch(err => console.error(err));
        }
    }, [counter])

    return (
        <div className="text-input-row">
            <form onSubmit={addMessage}>
                <Grid container spacing={3}>
                    <Grid item xs={10}>
                        <Input fullWidth placeholder="Type Message..." value={message} onChange={(e) => setMessage(e.target.value)}/>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton color="primary" fullWidth onClick={addMessage} style={{"outline":"none"}} ><SendIcon/></IconButton>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default TextInput;