import React, {useContext, useEffect, useState} from 'react'
import {Context} from "./context";
import firebase from "firebase";


const LikeButton = ({id})=>{

    const{videos, currentUser} = useContext(Context)


    function handleLike(event){
        const likeBtnId = event.target.getAttribute('id')

        videos.map((video)=>{
            if (likeBtnId === video.id){
                const userVideo = firebase.database().ref(`videos/${currentUser.uid}`)
                const userVideoData = {
                    video: video,
                    identNumber: currentUser.uid,
                    liked: true
                }
                userVideo.push(userVideoData)
            }
        })
    }

    return (
        <button className="like" onClick={handleLike} id={id}>
            Like
        </button>
    )

}

export default LikeButton