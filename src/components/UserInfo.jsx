import React, {useContext, useEffect, useState} from 'react'
import {Context} from "./context";
import firebase from "firebase";



const UserInfo = () => {
    const{currentUser} = useContext(Context)
    const[currentUserName, setCurrentUserName] = useState()

    useEffect(()=>{
        let isSubscribed = true;

        if(currentUser){
            firebase.database().ref(`users/${currentUser.uid}`).on('value', (snapshot)=>{
                snapshot.forEach((data)=>{
                    const currentUserName = data.val().name
                    const currentUserId = data.val().id
                    if(currentUserId === currentUser.uid){
                        setCurrentUserName(currentUserName)
                    }
                })
            })
        }

        return () => (isSubscribed = false)

    },[])

    if(currentUser){

        return (
            <>
                <div className="name">Name: <span>{currentUserName}</span></div>
                <div className="name">Email: <span>{currentUser.email}</span></div>
            </>
        )
    }

}

export default UserInfo