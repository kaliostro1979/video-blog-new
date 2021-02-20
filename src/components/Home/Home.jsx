import React, {useContext, useEffect} from 'react'
import {Col, Row} from "react-bootstrap";
import {Context} from "../context/context";
import LikeButton from "../LikeButton/LIkeButton";
import {Link} from "react-router-dom";
import hs from './HomeStyles.module.css'


const Home = () => {

    const {videos, youtubeEmbed, currentUser} = useContext(Context)

    return (
        <Row>
            <Col lg={12}>
                <div className={hs.HomeMain}>
                    <h1 className={hs.PageTitle}>Videos</h1>
                    <p className={hs.HomeText}>
                        You will see all the videos that you like in your
                        <Link to={currentUser ? '/user-page' : '/login'}> personal account </Link>
                        page</p>
                    <Row>
                        <Col lg={12}>
                            <Row>
                                {
                                    videos.map((e) => {
                                        e.liked = false
                                        return (
                                            <Col lg={3} md={6} key={e.id}>
                                                <div className={hs.Videos}>
                                                    <iframe src={youtubeEmbed + `${e.snippet.resourceId.videoId}`}
                                                            frameBorder="0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen>
                                                    </iframe>
                                                    <p>{e.snippet.title}</p>
                                                    <LikeButton id={e.id} video={e}/>
                                                </div>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    )
}

export default Home