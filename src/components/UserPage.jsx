import React, {useContext, useEffect, useMemo, useState} from 'react'
import UserInfo from "./UserInfo";
import {Context} from "./context";
import {Redirect} from "react-router-dom";
import firebase from "firebase";


const UserPage = () => {
    const {currentUser, youtubeEmbed} = useContext(Context)

    const [videos, setVideos] = useState([])


    useEffect(() => {

        let isSubscribed = true;

        firebase.database().ref(`videos/${currentUser.uid}`).on('value', (snapshot) => {
            let likedVideos = snapshot.val()
            let videoArray = []
            for (let videoKey in likedVideos) {
                videoArray.push({videoKey, ...likedVideos[videoKey]})
            }
            setVideos(videoArray)
        })

        return () => (isSubscribed = false)
    }, [])


    function handleDisLike(video) {
        firebase.database().ref(`videos/${currentUser.uid}`).child(video.videoKey).remove()
    }


    if (currentUser) {
        return (
            <>
                <h1>User Page</h1>
                <div className="user-info">
                    <UserInfo/>
                </div>
                <div className="container">
                    {
                        videos ? videos.map((video, i) => {
                            return (
                                <div className="videos" key={i}>
                                    <iframe src={youtubeEmbed + `${video.video.snippet.resourceId.videoId}`}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen>
                                    </iframe>
                                    <p>{video.video.snippet.title}</p>
                                    <button className="like" onClick={() => handleDisLike(video)} id={video.video.id}>
                                        Dislike
                                    </button>
                                </div>
                            )
                        }) : ''
                    }
                </div>
            </>
        )
    } else {
        return <Redirect to="/"/>
    }


}

export default UserPage