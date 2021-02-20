import React from "react";
import {Container, Row, Col} from "react-bootstrap";
import cs from './ChatStyle.module.css'


const Chat = () => {
    return (
        <Row>
            <Col lg={12}>
                <div className={cs.ChatMain}>
                    <h1 className={cs.PageTitle}>Chat</h1>
                </div>
            </Col>
        </Row>
    )
}

export default Chat