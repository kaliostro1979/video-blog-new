import React, {useContext, useEffect, useState} from 'react'
import {Context} from "../context/context";
import uis from './UserInfoStyles.module.css'


const UserInfo = () => {
    const {currentUser, avatarURL, currentUserName} = useContext(Context)


    if (currentUser) {

        return (
            <>
                <div className={uis.Avatar}>
                    <img src={avatarURL} alt=""/>
                </div>
                <div className={uis.UsernameBlock}>Welcome <strong>{currentUserName}</strong></div>
            </>
        )
    }

}

export default UserInfo