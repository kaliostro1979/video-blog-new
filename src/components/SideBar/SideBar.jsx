import React from "react";
import {Link} from "react-router-dom";
import SS from './SidebarStyles.module.css'


const SideBar = () => {
    return (
        <div className={SS.Sidebar}>
            <ul className={SS.SidebarList}>
                <li><Link to="/">Videos</Link></li>
                <li><Link to="/chat">Chat</Link></li>
                <li><Link to="/#">Link1</Link></li>
                <li><Link to="/#">Link2</Link></li>
                <li><Link to="/#">Link3</Link></li>
            </ul>
        </div>
    )
}

export default SideBar