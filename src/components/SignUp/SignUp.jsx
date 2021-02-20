import React, {useState} from 'react'
import {auth} from "../../firebase";
import firebase from "firebase";
import {Link} from "react-router-dom";
import {Row, Col, Form, FormGroup, FormControl, Button, FormLabel} from "react-bootstrap";
import sus from './SignUpStyles.module.css'


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
        <Row>
            <Col lg={12}>
                <div className={sus.SignUpFormMain}>
                    <h1 className={sus.PageTitle}>SignUp</h1>

                    <Form action="" className={sus.SignUpForm} onSubmit={signUpHandler}>
                        <FormGroup>
                            <FormLabel htmlFor="user-name">Username</FormLabel>
                            <FormControl id="user-name" type="text" onChange={getUserName} value={userName}
                                   required/>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <FormControl id="email" type="text" onChange={getEmail} value={email} required/>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <FormControl id="password" type="password" onChange={getPassword}
                                   value={password} required/>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel htmlFor="confirm-password">Confirm Password</FormLabel>
                            <FormControl id="confirm-password" type="password" onChange={getConfirmPassword}
                                   value={confirmPassword} required/>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel htmlFor="avatar">Upload Avatar</FormLabel>
                            <FormControl id="avatar" className={sus.AvatarInput} type="file" accept="image/x-png,image/gif,image/jpeg"onChange={getUserAvatar}/>
                        </FormGroup>
                        <Button type="submit" variant="primary" className={sus.BlogBtn}>Sign Up</Button>
                    </Form>

                    <Row>
                        <Col lg={12}>
                            <div className={sus.Messages}>
                                <div className={sus.ForgotPassword}><span>Already have account? </span> <Link to="/login">Log In</Link>
                                </div>
                                <div><p className="error">{errors}</p></div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    )
}

export default SignUp