import React, {useContext, useState} from 'react'
import {auth} from "../firebase";
import firebase from "firebase";
import {Link} from "react-router-dom";


const SignUp = ({history}) => {


    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [avatar, setAvatar] = useState()
    const [userId, setUserId] = useState('')
    const [errors, setErrors] = useState('')


    async function signUpHandler(event) {
        if (password === confirmPassword) {
            let videos = []
            event.preventDefault()
           await auth.createUserWithEmailAndPassword(email, password)
                .then((data) => {
                    setEmail('')
                    setPassword('')
                    const userUid = data.user.uid  // Get current user ID
                    setUserId(userUid)
                    const newUser = firebase.database().ref(`users/${userUid}`)
                    const newUserData = {
                        id: userUid,
                        name: userName,
                        video: videos.push(),
                        email: email
                    }
                    newUser.push(newUserData)
                    firebase.storage().ref(`users/${userUid}/${userUid}.jpg`).put(avatar)
                        .then((img) => {
                            console.log(img);
                        })
                        .catch((err) => {
                            console.log(err.message);
                        })
                    history.push('/')
                })
                .catch((error) => {
                    setErrors(error.message)
                })
        } else {
            return <p>{errors}</p>
        }
    }


    function getEmail(event) {
        setEmail(event.target.value)
    }

    function getPassword(event) {
        setPassword(event.target.value)
    }

    function getConfirmPassword(event) {
        setConfirmPassword(event.target.value)
    }

    function getUserName(event) {
        setUserName(event.target.value)
    }


    async function getUserAvatar(event) {
        await setAvatar(event.target.files[0])
    }

    return (
        <>
            <h1 className="page-title">SignUp</h1>

            <form action="" className="signup-form" onSubmit={signUpHandler}>
                <div className="form-group">
                    <label htmlFor="user-name">Username</label>
                    <input id="user-name" className="form-control" type="text" onChange={getUserName} value={userName}
                           required/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" className="form-control" type="text" onChange={getEmail} value={email} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" className="form-control" type="password" onChange={getPassword}
                           value={password} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input id="confirm-password" className="form-control" type="password" onChange={getConfirmPassword}
                           value={confirmPassword} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="avatar">Upload Avatar</label>
                    <input id="avatar" className="form-control" type="file" onChange={getUserAvatar}/>
                </div>
                <button className="btn btn-primary blog-btn">Sign Up</button>
            </form>

            <div className="messages">
                <div className="forgot-password avatar-input"><span>Already have account? </span> <Link to="/login">Log In</Link>
                </div>
                <div><p className="error">{errors}</p></div>
            </div>
        </>
    )
}

export default SignUp