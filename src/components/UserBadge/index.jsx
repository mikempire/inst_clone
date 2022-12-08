import React from 'react';
import './styles.css';
import {useNavigate} from "react-router-dom";

const UserBadge = ({
                       nickName,
                       avatarUrl,
                       id
                   }) => {
    const navigate = useNavigate();

    const onClickUserBadge = () => {
        navigate(`/${id}`);
    }
    return (
        <div className='cnUserBadgeRoot' onClick={onClickUserBadge}>
            {
                avatarUrl ? <img src={avatarUrl} alt="avatar" className='cnUserBadgeAvatar'/> : <div className='cnUserBadgePlaceholder'></div>
            }

            <span className='cnUserBadgeName'>{nickName}</span>
        </div>
    );
};

export default UserBadge;