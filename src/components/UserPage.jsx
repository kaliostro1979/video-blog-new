import React, {useContext, useEffect, useMemo, useState} from 'react'
import UserInfo from "./UserInfo";
import {Context} from "./context";
import {Link, Redirect} from "react-router-dom";
import firebase from "firebase";


const UserPage = () => {
    const {currentUser, youtubeEmbed} = useContext(Context)

    const [videos, setVideos] = useState([])
    const [noVideo, setNoVideo] = useState('')




    useEffect(() => {
        setNoVideo('You have no any liked video yet')
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

    function handleDeleteAccount (){
        currentUser.delete()
    }


    if (currentUser) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className="page-title">User Page</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-9">
                        <div className="row">
                            {
                                videos.length > 0 ? videos.map((video, i) => {
                                    return (
                                        <div className="videos col-xl-3 col-md-4 col-sm-6" key={i}>
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
                                }) : <div className="col-lg-12 text-center no-video"><p>{noVideo}</p></div>
                            }
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="user-info">
                            <UserInfo/>
                            <div className="messages">
                                <Link to="/reset-password">Reset Password</Link>
                                <button className="btn btn-danger" onClick={handleDeleteAccount}>Delete Account</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <Redirect to="/"/>
    }


}

export default UserPage