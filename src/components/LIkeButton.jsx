import React, {useContext, useEffect, useMemo, useState} from 'react'
import {Context} from "./context";
import firebase from "firebase";


const LikeButton = ({id})=>{
    const{videos, currentUser} = useContext(Context)

    const[videoId, setVideoId] = useState([])
    useMemo(getLikedVideos, [currentUser])


    function getLikedVideos(){
        let likedVideosArray =[]
        if (currentUser){
            firebase.database().ref(`videos/${currentUser.uid}`).on('value', (snapshot)=>{
                snapshot.forEach((data)=>{
                    likedVideosArray = [data.val().video, ...likedVideosArray]
                    setVideoId(likedVideosArray)
                })
            })
        }
    }


    function handleLike(event){
        const likeBtnId = event.target.getAttribute('id')
        videos.map((video)=>{
            if (likeBtnId === video.id){
                const userVideo = firebase.database().ref(`videos/${currentUser.uid}`)
                const userVideoData = {
                    video: video,
                    liked: true
                }
                userVideo.push(userVideoData)
            }
        })
    }

    return(
        <>
            <button className="like" onClick={handleLike} id={id}>
                Like
            </button>
            {
                videoId.map((vid)=>{
                    if(vid.id === id && currentUser){
                        return (
                            <button className="liked" onClick={handleLike} id={id} disabled>
                                Like
                            </button>
                        )
                    }
                })
            }
        </>
    )

}

export default LikeButton