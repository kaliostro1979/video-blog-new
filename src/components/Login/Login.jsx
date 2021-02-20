import React, {useState} from 'react'
import {auth} from "../../firebase";
import {Link} from "react-router-dom";
import {Row, Form, FormGroup, FormControl, Button, FormLabel, Col} from "react-bootstrap";
import ls from './LoginStyles.module.css'


const Login = ({history}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    function getEmail(event) {
        setEmail(event.target.value)
    }

    function getPassword(event) {
        setPassword(event.target.value)
    }

    async function handleLogin(event) {
        event.preventDefault()
        await auth.signInWithEmailAndPassword(email, password)
            .then((data) => {
                history.push('/')
            })
            .catch((err) => {
                setError(err.message)
            })
    }

    return (
        <Row>
            <Col lg={12}>
                <div className={ls.LoginMain}>
                    <h1 className={ls.PageTitle}>Login</h1>
                    <Form className={ls.LoginForm} onSubmit={handleLogin}>
                        <FormGroup>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <FormControl id="email" type="text" onChange={getEmail} required/>
                        </FormGroup>
                        <FormGroup>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <FormControl id="password" type="password" onChange={getPassword} required/>
                        </FormGroup>
                        <Button variant="primary" type="submit" className={ls.BlogBtn}>Login</Button>
                    </Form>
                    <Row>
                        <Col lg={12}>
                            <div className={ls.Messages}>
                                <div className={ls.ForgotPassword}>
                                    <Link to="/forget-password">Forgot password?</Link><br/>
                                </div>
                                <div className={ls.SignUp}><span>Dont have an account? </span>
                                    <Link to="/sign-up">SignUp</Link></div>
                                <div><p className="error">{error}</p></div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    )
}

export default Login