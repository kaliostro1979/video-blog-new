import React, {useContext, useState} from 'react'
import {Context} from "../context/context";
import {Redirect} from "react-router-dom";
import {Row, Col, Form, FormGroup, FormControl, Button, FormLabel} from "react-bootstrap";
import rps from './ResetPasswordStyles.module.css'


const ResetPassword = ({history}) => {
    const {currentUser} = useContext(Context)

    const [newPassword, setNewPassword] = useState('')
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('')
    const [error, setError] = useState('')

    function handleResetPassword(event) {
        event.preventDefault()
        if (newPassword === newPasswordConfirm) {
            return currentUser.updatePassword(newPassword)
                .then((data) => {
                    history.push('/user-page')
                })
                .catch((err) => {

                })
        } else {
            setError('Password mismatch')
            console.log(error);
        }
    }

    function getNewPassword(event) {
        const newPass = event.target.value
        setNewPassword(newPass)
    }

    function getNewPasswordConfirm(event) {
        const newPassConf = event.target.value
        setNewPasswordConfirm(newPassConf)
    }


    if (currentUser) {
        return (
            <Row>
                <Col lg={12}>
                    <div className={rps.resetPassFormMain}>
                        <h1 className={rps.PageTitle}>Reset Password</h1>
                        <Form action="" className={rps.ResetPassForm} onSubmit={handleResetPassword}>
                            <FormGroup>
                                <FormLabel htmlFor="user-email">User Email</FormLabel>
                                <FormControl type="email" id="user-email"
                                             defaultValue={currentUser.email}/>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel htmlFor="new-password">New Password</FormLabel>
                                <FormControl type="password" id="new-password"
                                             placeholder="New password" required
                                             onChange={getNewPassword}/>
                            </FormGroup>
                            <FormGroup>
                                <FormLabel htmlFor="rep-password">Repeat Password</FormLabel>
                                <FormControl type="password" id="rep-password" placeholder="Repeat password" required onChange={getNewPasswordConfirm}/>
                            </FormGroup>
                            <Button type="submit" className={rps.BlogBtn}>Change Password</Button>
                        </Form>
                        <p className="error">{error}</p>
                    </div>
                </Col>
            </Row>
        )
    } else {
        return <Redirect to="/login"/>
    }
}

export default ResetPassword