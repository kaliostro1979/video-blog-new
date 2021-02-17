import React, {useContext, useState} from 'react'
import {auth} from "../firebase";
import {Link} from "react-router-dom";
import {Context} from "./context";



const Login = ({history}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    function getEmail(event){
        setEmail(event.target.value)
    }

    function getPassword(event){
        setPassword(event.target.value)
    }

    async function handleLogin (event){
        event.preventDefault()
        await auth.signInWithEmailAndPassword(email, password)
            .then((data)=>{
                history.push('/')
            })
            .catch ((err)=>{
                setError(err.message)
            })
    }

    return (
        <>
            <h1 className="page-title">Login</h1>
            <form action="" className="signup-form" onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" className="form-control" type="text" onChange={getEmail} required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input id="password" className="form-control" type="password" onChange={getPassword} required/>
                </div>
                <button className="btn btn-primary blog-btn">Login</button>
            </form>
            <div className="container">
                <div className="messages">
                    <div className="forgot-password"><Link to="/forget-password">Forgot password?</Link><br/></div>
                    <div className="sign-up"><span>Dont have an account? </span> <Link to="/sign-up">Sign Up</Link></div>
                    <div><p className="error">{error}</p></div>
                </div>
            </div>
        </>
    )
}

export default Login