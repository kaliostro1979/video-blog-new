import React, {useContext, useEffect} from 'react'
import {Context} from "./context";
import LikeButton from "./LIkeButton";


const Home = () => {

    const {videos, handleLike, youtubeEmbed} = useContext(Context)

    return (
        <div>
            <h1>Home</h1>
            <div className="container">
                {
                    videos.map((e) => {
                        return (
                            <div className="videos" key={e.id}>
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
    )
}

export default Home