import React, {useContext, useState} from 'react'
import {auth} from "../firebase";



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

    function handleLogin (event){
        event.preventDefault()
        auth.signInWithEmailAndPassword(email, password)
            .then((data)=>{
                history.push('/')
            })
            .catch ((err)=>{
                setError(err.message)
                //history.push('/sign-up')
            })

    }

    return (
        <>
            <h1>Login</h1>
            <form action="" className="signup-form" onSubmit={handleLogin}>
                <label htmlFor="email">Email</label>
                <input id="email" type="text" onChange={getEmail} required/>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" onChange={getPassword} required/>
                <button className="btn">Login</button>
            </form>
            <p className="error">{error}</p>
        </>
    )
}

export default Login