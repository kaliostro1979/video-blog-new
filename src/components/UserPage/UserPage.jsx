import React, {useContext, useEffect, useState} from 'react'
import UserInfo from "../UserInfo/UserInfo";
import {Context} from "../context/context";
import {Link, Redirect} from "react-router-dom";
import {Row, Col, Button} from "react-bootstrap";
import firebase from "firebase";
import ups from './UserPageStyles.module.css'


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
            <Row>
                <Col lg={12}>
                    <div className={ups.UserPageMain}>
                        <h1 className={ups.PageTitle}>User Page</h1>
                        <Row>
                            <Col lg={9}>
                                <Row>
                                    {
                                        videos.length > 0 ? videos.map((video, i) => {
                                            return (
                                                <Col lg={3} key={i}>
                                                    <div className={ups.Videos}>
                                                        <iframe src={youtubeEmbed + `${video.video.snippet.resourceId.videoId}`}
                                                                frameBorder="0"
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                allowFullScreen>
                                                        </iframe>
                                                        <p>{video.video.snippet.title}</p>
                                                        <Button className={ups.Dislike} variant={"danger"} onClick={() => handleDisLike(video)} id={video.video.id}>
                                                            Dislike
                                                        </Button>
                                                    </div>
                                                </Col>
                                            )
                                        }) : <div className="col-lg-12 text-center no-video"><p>{noVideo}</p></div>
                                    }
                                </Row>
                            </Col>
                            <Col lg={3}>
                                <div className={ups.UserInfo}>
                                    <UserInfo/>
                                    <div className={ups.Messages}>
                                        <Link to="/reset-password">Reset Password</Link>
                                        <Button variant="danger" className={ups.DeleteAccountBtn} onClick={handleDeleteAccount}>Delete Account</Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        )
    } else {
        return <Redirect to="/"/>
    }


}

export default UserPage