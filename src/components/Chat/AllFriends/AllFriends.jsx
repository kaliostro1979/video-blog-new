import React, {useContext, useEffect, useState} from "react";
import af from "./AllFriendsStyle.module.css";
import {Button, Col, Row} from "react-bootstrap";
import {Context} from "../../context/context";
import firebase from "firebase";

const AllFriends = () => {

    const {friends, currentUser, allUsers} = useContext(Context)

    const [friendStatus, setFriendStatus] = useState(false)
    const [friendId, setFriendId] = useState('')
    const [usersId, setUsersId] = useState('')
    const [usersStatus, setUsersStatus] = useState(false)


    function getFriendsInfo (){
        friends.forEach((e)=>{
            setFriendId(e.id)
        })
    }

    function getUsersStatus (){
        allUsers.forEach((e)=>{
            setUsersStatus(e.status)
            setUsersId(e.id)
        })
    }

    useEffect(async ()=>{
        getFriendsInfo ()
        getUsersStatus ()
        if(friendId === usersId){
            await firebase.database().ref(`users/${currentUser.uid}`).child('friends').on('value', (snapshot)=>{
                snapshot.forEach((item)=>{
                    setFriendStatus(item.val().status)
                })
            })
        }

    },[friendStatus])

    console.log(friendStatus, usersStatus);

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
                                                 style={{backgroundImage: `url(${friendStatus ? f.imagePath : './avatar.png'})`}}>

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