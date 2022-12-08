import React from 'react';
import './styles.css';
import UserBadge from "../UserBadge";

const Navbar = ({
                    nickName,
                    avatarUrl,
                    id
                }) => {
    return (
        <div className="cnNavbarRoot">
            <div className="cnNavbarWrapper">
                <span>Instagram</span>
                <UserBadge nickName={nickName} avatarUrl={avatarUrl} id={id}/>
            </div>
        </div>
    );
};

export default Navbar;