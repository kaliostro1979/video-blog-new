import React, {useContext, useEffect} from 'react'
import {Context} from "./context";
import LikeButton from "./LIkeButton";
import {Link} from "react-router-dom";


const Home = () => {

    const {videos, youtubeEmbed, currentUser} = useContext(Context)

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <h1 className="text-center page-title">Home</h1>
                    <p className="text-center home-text">
                        You will see all the videos that you like in your
                        <Link to={currentUser ? '/user-page' : '/login'}> personal account </Link>
                        page</p>
                    <div className="row">
                        {
                            videos.map((e) => {
                                e.liked = false
                                return (
                                    <div className="videos col-xl-3 col-lg-4 col-md-6" key={e.id}>
                                        <iframe src={youtubeEmbed + `${e.snippet.resourceId.videoId}`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen>
                                        </iframe>
                                        <p>{e.snippet.title}</p>
                                        <LikeButton id={e.id} video={e}/>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home