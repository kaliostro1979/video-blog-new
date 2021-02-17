import React, {useContext, useEffect, useState} from 'react'
import {Context} from "./context";
import {auth} from "../firebase";
import {Link} from "react-router-dom";
import firebase from "firebase";

const ForgetPassword = () => {

    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')


    function handlePasswordResetEmail(event) {
        event.preventDefault()
        auth.sendPasswordResetEmail(email)
            .then(() => {
                setSuccess('Email sent successfully')
                return <Link to="login">Login</Link>
            })
            .catch((err) => {
                setError(err.message)
            })
    }

    function getUserEmail(event) {
        const enterEmail = event.target.value
        setEmail(enterEmail)
    }


    return (
        <>
            <h1 className="page-title">Forgot Password</h1>
            <form action="" className="signup-form" onSubmit={handlePasswordResetEmail}>
                <div className="form-group">
                    <label htmlFor="enter-email">Enter Email</label>
                    <input type="email" className="form-control" id="enter-email" placeholder="Enter Email" required onChange={getUserEmail}/>
                </div>
                <button className="btn btn-primary blog-btn">Reset Password</button>
            </form>
            <p>{error ? error : success}</p>
        </>
    )
}

export default ForgetPassword