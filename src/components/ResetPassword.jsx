import React, {useContext, useState} from 'react'
import {Context} from "./context";
import {Redirect} from "react-router-dom";
import firebase from "firebase";
import {auth} from "../firebase";


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
            <>
                <h1 className="page-title">Reset Password</h1>
                <form action="" className="signup-form" onSubmit={handleResetPassword}>
                    <div className="form-group">
                        <label htmlFor="user-email">User Email</label>
                        <input type="email" className="form-control" id="user-email"
                               defaultValue={currentUser.email}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="new-password">New Password</label>
                        <input type="password" className="form-control" id="new-password"
                               placeholder="New password" required
                               onChange={getNewPassword}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="rep-password">Repeat Password</label>
                        <input type="password" className="form-control" id="rep-password"placeholder="Repeat password" required onChange={getNewPasswordConfirm}/>
                    </div>
                    <button className="btn btn-primary blog-btn">Change Password</button>
                </form>
                <p className="error">{error}</p>
            </>
        )
    } else {
        return <Redirect to="/login"/>
    }
}

export default ResetPassword