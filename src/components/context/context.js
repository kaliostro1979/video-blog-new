import React, {useEffect, useMemo, useState} from 'react'
import {auth} from "../../firebase";
import firebase from "firebase";


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
    const [friends, setFriends] = useState([])

    /*====================================================================================================================*/

    /*---- Clear Local in End of Session ----*/

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then()


    /*--- User Status Handling ----*/

    useEffect(async () => {

        let isMounted = true;
        await auth.onAuthStateChanged(user => {
            if (user !== null) {
                setCurrentUser(user)
            }
            if (user === null) {
                setStatus(false)
                setCurrentUser(null)
            }
        });

        return () => isMounted = false
    }, [])


    /*--- End of User Status Handling ----*/

    /*==================================================================================================================*/

    useEffect(async () => {

        let isMounted = true;

        /*---- Get Current User Name ----*/
        if (currentUser) {

            await firebase.database().ref(`users/${currentUser.uid}`).on('value', (snapshot) => {
                let dataValue = snapshot.val()
                if (dataValue !== null) {
                    setStatus(true)
                    var currentUserName = dataValue.name
                    var currentUserId = dataValue.id
                    if (currentUserId === currentUser.uid) {
                        setCurrentUserName(currentUserName)
                    }
                    firebase.storage().ref(`users/${currentUser.uid}/${currentUser.uid}.jpg`).getDownloadURL()
                        .then((imgURL) => {
                            /*console.log(imgURL);*/
                            setAvatarURL(imgURL)
                        })
                        .catch((err) => {

                        })
                }
            })

            /*==================================================================================================================*/

            /*--- Update User avatar URL and Status ----*/
            console.log(status);
            if (status){
                await firebase.database().ref(`users/`).child(`${currentUser.uid}`).update({
                    imagePath: avatarURL,
                    status: status
                })
            }else{
                await firebase.database().ref(`users/`).child(`${currentUser.uid}`).update({
                    imagePath: './avatar.png',
                    status: status
                })
            }

            /*--- End of Update User avatar URL and Status ----*/

            /*==================================================================================================================*/

            /*---- Get All Users ----*/

            await firebase.database().ref().child('users').on('value', (snapshot) => {
                let userArray = []
                snapshot.forEach((data) => {
                    if (data.val().id !== currentUser.uid) {
                        userArray = [data.val(), ...userArray]
                        setAllUsers(userArray)
                    }
                });
            })

            /*---- End of Get All Users ----*/

            /*---- Get All Friends List ----*/


            await firebase.database().ref(`users/${currentUser.uid}/`).child('friends').on('value', (snapshot) => {
                let fr = []
                snapshot.forEach((friend) => {
                    fr = [friend.val(), ...fr]
                    setFriends(fr)
                })
            })


            /*---- End of Get All Friends List ----*/


            /*==================================================================================================================*/

        }

        return () => isMounted = false

    }, [currentUser, avatarURL, status])





    /*---- Handle Friends Adding ----*/

    function handleAddFriends(event) {
        const addFriendBtn = event.target
        const addFriendBtnId = addFriendBtn.getAttribute('id')
        allUsers.map((fr) => {
            if (addFriendBtnId === fr.id && addFriendBtnId !== currentUser.uid) {
                const selectedFriends = firebase.database().ref(`users/${currentUser.uid}/friends`)
                selectedFriends.push(fr)
                addFriendBtn.setAttribute('disabled', true)
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

    useMemo(async () => {


        let isMounted = true;

        setLoading(true)

        await getVideos().then()

        setLoading(false)

        return () => {
            isMounted = false
        };
    }, []).then()

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
                handleAddFriends,
                friends
            }}>
            {!loading && children}
        </Context.Provider>
    )
}