import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyDHQqrBpSk4-dnGcpo-peKEI47h8CAxnLU",
    authDomain: "new-video-blog.firebaseapp.com",
    databaseURL: "https://new-video-blog-default-rtdb.firebaseio.com",
    projectId: "new-video-blog",
    storageBucket: "new-video-blog.appspot.com",
    messagingSenderId: "86149703297",
    appId: "1:86149703297:web:ae6f783cae2583d5858f80"
});


export const auth = firebase.auth()
export default firebaseConfig



