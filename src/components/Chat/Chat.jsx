import React, {useContext, useEffect, useMemo, useState} from "react";
import {FormLabel, Row, Col, Form, FormGroup, Button} from "react-bootstrap";
import cs from './ChatStyle.module.css'
import AllUsers from "./AllUsers/AllUsers";
import AllFriends from "./AllFriends/AllFriends";
import firebase from "firebase";
import {Context} from "../context/context";
import {useHistory, Redirect} from "react-router-dom";


const Chat = () => {

    const {currentUser, currentUserName} = useContext(Context)
    const[message, setMessage] = useState('')
    const [date, setDate] = useState('')
    const [sentMessages, setSentMessages] = useState([])


    useEffect(async ()=>{

        let isSubscribed = true;

        await firebase.database().ref(`messages/${currentUser.uid}`).on('value', (snapshot)=>{
            let messagesArr = []
            snapshot.forEach((snap)=>{
                messagesArr=[snap.val(), ...messagesArr]
            })
            setSentMessages(messagesArr)
        })

        return () => (isSubscribed = false)

    },[])


    function handleMessage(event){
        let message = event.target.value
        setMessage(message)
    }

    async function handleSendingMessage(event){
        event.preventDefault()
        const date = new Date().toDateString();
        setDate(date)
        const userMessage = await firebase.database().ref(`messages/${currentUser.uid}`)
        const userMessageData = {
            date: date,
            author: currentUserName,
            body: message
        }
        userMessage.push(userMessageData)
        setMessage('')
    }

    if(currentUser){
        return (
            <Row>
                <Col lg={12}>
                    <Row>
                        <Col lg={12}>
                            <div className={cs.ChatMain}>
                                <h1 className={cs.PageTitle}>Chat</h1>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <AllUsers/>
                        <Col lg={8}>
                            <div className={cs.ChatFieldMain}>
                                <h3>Chat Field</h3>
                                <div className={cs.SentMessages}>
                                    <ul>
                                        {
                                            sentMessages.map((m, index)=>{
                                                console.log(m);
                                                return(
                                                    <li key={index}>
                                                        <p>{m.body}</p>
                                                        <small>{m.date}</small>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                                <div className={cs.MessageBlock}>
                                    <Form onSubmit={handleSendingMessage}>
                                        <FormLabel>Enter your message Here</FormLabel>
                                        <FormGroup>
                                            <Form.Control as="textarea" rows={3} value={message} onChange={handleMessage}/>
                                        </FormGroup>
                                        <Button type="submit">Send</Button>
                                    </Form>
                                </div>
                            </div>
                        </Col>
                        <AllFriends/>
                    </Row>
                </Col>
            </Row>
        )
    }else{
        return <Redirect to="/login"/>
    }

}

export default Chat