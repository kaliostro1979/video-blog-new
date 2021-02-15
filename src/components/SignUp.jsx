import React, {useContext, useState} from 'react'
import {auth} from "../firebase";
import {Context} from "./context";
import firebase from "firebase";


const SignUp = ({history}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userName, setUserName] = useState('')
    const [userId, setUserId] = useState('')
    const [errors, setErrors] = useState('')


    function signUpHandler (event){
        let videos =[]
        event.preventDefault()
        auth.createUserWithEmailAndPassword(email, password)
            .then((data)=>{
                setEmail('')
                setPassword('')
                const userUid = data.user.uid  // Get current user ID
                setUserId(userUid)
                const newUser = firebase.database().ref(`users/${userUid}`)
                const newUserData = {
                    id: userUid,
                    name: userName,
                    video: videos.push()
                }
                newUser.push(newUserData)

                history.push('/')
            })
            .catch ((error)=>{
            setErrors(error.message)
        })
    }



    function getEmail(event) {
        setEmail(event.target.value)
    }

    function getPassword(event) {
        setPassword(event.target.value)
    }

    function getUserName(event){
        setUserName(event.target.value)
    }

    return (
        <>
            <h1>SignUp</h1>

            <form action="" className="signup-form" onSubmit={signUpHandler}>
                <label htmlFor="email">Username</label>
                <input id="email" type="text" onChange={getUserName} value={userName} required/>
                <label htmlFor="email">Email</label>
                <input id="email" type="text" onChange={getEmail} value={email} required/>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" onChange={getPassword} value={password} required/>
                <button className="btn">Sign Up</button>
            </form>
            <p className="error">{errors}</p>
        </>
    )
}

export default SignUp