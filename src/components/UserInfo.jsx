import React, {useContext, useEffect, useState} from 'react'
import {Context} from "./context";
import firebase from "firebase";



const UserInfo = () => {
    const{currentUser, avatarURL} = useContext(Context)
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
            <>  <div className="avatar">
                <img src={avatarURL} alt=""/>
            </div>
                <div className="text-center username-block">Welcome <strong>{currentUserName}</strong></div>
            </>
        )
    }

}

export default UserInfo