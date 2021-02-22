import React, {useEffect, useMemo, useState} from 'react'
import {auth} from "../../firebase";
import firebase, {onLog} from "firebase";


/*Current User*/
export const Context = React.createContext();

export const Provider = ({children}) => {


    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [avatarURL, setAvatarURL] = useState('./avatar.png')
    const [imagePath, setImagePath] = useState('')
    const [status, setStatus] = useState(false)
    const [currentUserName, setCurrentUserName] = useState()
    const [allUsers, setAllUsers] = useState([])

  /*====================================================================================================================*/

    /*--- User Status Handling ----*/

    useEffect(async () => {

        let isMounted = true;
        await auth.onAuthStateChanged(user => {
            setStatus(false)
            if (user) {
                firebase.storage().ref(`users/${user.uid}/${user.uid}.jpg`).getDownloadURL()
                    .then((imgURL) => {
                        setAvatarURL(imgURL)
                    })
            }
            setCurrentUser(user)
        });
        setLoading(false)

        return () => {isMounted = false};
    }, [currentUser])


    /*--- End of User Status Handling ----*/

    /*==================================================================================================================*/

    useEffect(async () => {
        let isMounted = true;

        /*---- Get Current User Name ----*/

        if (currentUser) {
            setStatus(true)
            await firebase.database().ref(`users/${currentUser.uid}`).on('value', (snapshot) => {
                let dataValue = snapshot.val()
                const currentUserName = dataValue.name
                const currentUserId = dataValue.id
                if (currentUserId === currentUser.uid) {
                    setCurrentUserName(currentUserName)
                }
            })

    /*==================================================================================================================*/

            /*--- Get User avatar URL ----*/

            if (status) {
                await firebase.database().ref(`users/${currentUser.uid}`).update({
                    imagePath: avatarURL,
                    status: status
                })
            } else {
                await firebase.database().ref(`users/${currentUser.uid}`).update({
                    imagePath: './avatar.png',
                })
            }

            /*--- End of Get User avatar URL ----*/

    /*==================================================================================================================*/

            /*---- Get All Users ----*/

            await firebase.database().ref().child('users').on('value', (snapshot) => {
                let userArray = []
                snapshot.forEach((data) => {
                    if (data.val().id !== currentUser.uid){
                        userArray = [data.val(), ...userArray]
                        setAllUsers(userArray)
                    }
                });
            })

            /*---- End of Get All Users ----*/


    /*==================================================================================================================*/

        }

        return () => {isMounted = false};

    }, [avatarURL, status])


    /*---- Handle Friends Adding ----*/

    function handleAddFriends(event) {
        const addFriendBtn = event.target
        const addFriendBtnId = addFriendBtn.getAttribute('id')
        allUsers.map((fr) => {
            if (addFriendBtnId === fr.id && addFriendBtnId !== currentUser.uid) {
                const selectedFriends = firebase.database().ref(`users/${currentUser.uid}/friends`)
                selectedFriends.push(fr)
            }
        })
    }

    /*---- End of Handle Friends Adding ----*/


    /*--- Get videos from Youtube Playlist ----*/

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

    useEffect(async () => {
        let isMounted = true;

        setLoading(true)

        await getVideos().then()

        setLoading(false)

        return () => {isMounted = false};
    }, [])

    /*----- End of Youtube API -----*/

    return (
        <Context.Provider
            value={{
                currentUser,
                videos,
                youtubeEmbed,
                avatarURL,
                setLoading,
                currentUserName,
                imagePath,
                status,
                allUsers,
                handleAddFriends
            }}>
            {!loading && children}
        </Context.Provider>
    )
}