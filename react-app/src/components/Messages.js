import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Messages(props) {

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [props.messages]);

    return (
        <div className="message-display">
            {props.messages.map(msg => {
                let { text, align } = msg;
                return (
                    <div className="msgContainer">
                        <div className={align == 0 ? 'speech-bubble-left' : 'speech-bubble-right'}>{text}</div>
                    </div>
                )
            })}
            <div ref={messagesEndRef} />
        </div>
    )
}

export default Messages;