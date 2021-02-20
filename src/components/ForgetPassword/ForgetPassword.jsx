import React, {useState} from 'react'
import {auth} from "../../firebase";
import {Link} from "react-router-dom";
import fps from './ForgetPasswwordStyles.module.css'
import {Row, Button, Col, Form, FormGroup, FormControl} from "react-bootstrap";


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
        <Row>
            <Col lg={12}>
                <div className={fps.SignUpFormMain}>
                    <h1 className="page-title">Forgot Password</h1>
                    <Form action="" className={fps.SignUpForm} onSubmit={handlePasswordResetEmail}>
                        <FormGroup>
                            <label htmlFor="enter-email">Enter Email</label>
                            <FormControl type="email" id="enter-email" placeholder="Enter Email" required onChange={getUserEmail}/>
                        </FormGroup>
                        <Button variant="primary" type="submit" className={fps.BlogBtn}>Reset Password</Button>
                    </Form>
                    <p>{error ? error : success}</p>
                </div>
            </Col>
        </Row>
    )
}

export default ForgetPassword