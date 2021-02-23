import React, {useContext, useEffect, useState} from "react";
import au from "./AllUsersStyle.module.css";
import {Col, Button, Row} from "react-bootstrap";
import firebase from "firebase";
import {Context} from "../../context/context";


const AllUsers = () => {

    const {status, allUsers, handleAddFriends, friends} = useContext(Context)



    return (
        <Col lg={3}>
            <div className={au.AllUsersMain}>
                <h3>All Users</h3>
                <ul>
                    {
                        allUsers.map((user) => {
                            return (
                                <li key={user.id}>
                                    <Row>
                                        <Col lg={3}>
                                            <div className={au.UserImageContainer} style={{backgroundImage: `url(${status ? user.imagePath : './avatar.png'})`}}>

                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <p>{user.name}</p>
                                        </Col>
                                        <Col lg={3}>
                                            <Button className={au.AddFriendBtn} onClick={handleAddFriends} id={user.id}>+</Button>
                                        </Col>
                                    </Row>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </Col>
    )
}

export default AllUsers