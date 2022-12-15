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
                <a href='/' className='cnNavbarLink'>Instagram</a>
                <UserBadge nickName={nickName} avatarUrl={avatarUrl} id={id}/>
            </div>
        </div>
    );
};

export default Navbar;