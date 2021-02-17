import React, {useEffect, useMemo, useState} from 'react'
import {auth} from "../firebase";
import firebase from "firebase";



/*Current User*/
export const Context = React.createContext();

export const Provider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [avatarURL, setAvatarURL] = useState('')

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user){
                firebase.storage().ref(`users/${user.uid}/${user.uid}.jpg`).getDownloadURL()
                    .then((imgURL)=>{
                        setAvatarURL(imgURL)
                    })
            }
            setCurrentUser(user)
            setLoading(false)
        });
        return unsubscribe
    }, [])


    /*Get videos from Youtube Playlist*/

    const apiKey = 'AIzaSyD1GdpolQTOiAob7oieVqPwhbVk4OKhjYI';
    const playlistId = 'PLX56KwBDdowY32DNPrU_HwlCclLvwE_Bq';
    const youtubeEmbed = 'https://www.youtube.com/embed/'
    const result = 20;

    const [videos, setVideos] = useState([])

    const getVideos = async function () {
       await fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=${result}&playlistId=${playlistId}&key=${apiKey}`)
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                const videoData = data.items;
                setVideos(videoData)
            });
    }

    useEffect(() => {

        getVideos().then()

    }, [])

    /*----- End of Youtube API -----*/


    /*----- Like function -----*/

    //const[liked, setLiked] = useState(false)






    return (
        <Context.Provider value={{currentUser, videos, youtubeEmbed, avatarURL, setLoading}}>
            {!loading && children}
        </Context.Provider>
    )
}