import React, {useContext, useEffect, useState} from "react";
import af from "./AllFriendsStyle.module.css";
import {Button, Col, Row} from "react-bootstrap";
import {Context} from "../../context/context";
import firebase from "firebase";

const AllFriends = () => {

    const {currentUser, status} = useContext(Context)

    const [friends, setFriends] = useState([])

    useEffect(async () => {

        let isMounted = true;

        await firebase.database().ref(`users/${currentUser.uid}/`).child('friends').on('value', (snapshot) => {
            let fr = []
            snapshot.forEach((friend) => {
                fr = [friend.val(), ...fr]
                setFriends(fr)
            })
        })

        return () => {isMounted = false};
    }, [])

    return (
        <Col lg={3}>
            <div className={af.AllFriendsMain}>
                <h3>Friends</h3>
                <ul>
                    {
                        friends.map((f) => {
                            return (
                                <li key={f.id}>
                                    <Row>
                                        <Col lg={3}>
                                            <div className={af.UserImageContainer}
                                                 style={{backgroundImage: `url(${status ? f.imagePath : './avatar.png'})`}}>

                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <p>{f.name}</p>
                                        </Col>
                                        <Col lg={3}>
                                            <Button className={af.RemoveFriend} id={f.id} variant="danger">-</Button>
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


export default AllFriends