import React, {useContext, useEffect, useMemo, useState} from 'react'
import {Context} from "../context/context";
import firebase from "firebase";
import {useHistory} from "react-router-dom";
import lbs from './LikeButtonStyles.module.css'
import {Button} from "react-bootstrap";


const LikeButton = ({id})=>{
    const{ currentUser, videos } = useContext(Context)

    const history = useHistory();
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


    async function handleLike(event){
        const likeBtnId = event.target.getAttribute('id')
        if(currentUser){
            await videos.map((video)=>{
                if (likeBtnId === video.id){
                    const userVideo = firebase.database().ref(`videos/${currentUser.uid}`)
                    const userVideoData = {
                        video: video,
                        liked: true
                    }
                    userVideo.push(userVideoData)
                }
            })
        }else{
            history.push('/login')
        }
    }

    return(
        <>
            <Button className={lbs.Like} onClick={handleLike} id={id}>
                Like
            </Button>
            {
                videoId.map((vid, i)=>{
                    if(vid.id === id && currentUser){
                        return (
                            <Button className={lbs.Liked} onClick={handleLike} id={id} disabled={true} key={i}>
                                Like
                            </Button>
                        )
                    }
                })
            }
        </>
    )

}

export default LikeButton