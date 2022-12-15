import React from 'react';
import './styles.css';
import UserCounter from "../UserCounter";


const UserBio = ({avatarUrl, nickname, lastName, firstName, description, url, subscribers, subscribed}) => {
    // const [btnProps, setBtnProps] = useState({onClick: () => false, children: 'Подписаться'});



    return (
        <div className='cnUserBioRoot'>
            <div className="">
                <img src={avatarUrl} alt="avatar" className='cnUserBioAvatar'/>
            </div>
            <div className="cnUserBioInfo">
                <div className="cnUserBioRow">
                    <span className='cnUserBioNickname'>{nickname}</span>
                    <button className='cnUserBioBtn'>Редактировать</button>
                </div>
                <div className="cnUserBioRow">
                    <UserCounter text='Публикация' count={5} className='cnUserBioCount'/>
                    <UserCounter text='Подписчиков' count={subscribers} className='cnUserBioCount'/>
                    <UserCounter text='Подписок' count={subscribed} className='cnUserBioCount'/>
                </div>
                <div className="cnUserBioRow">
                    <span className='cnUserBioName'>{firstName} {lastName} </span>
                </div>
                <div className="cnUserBioRow">
                    <span>{description}</span>
                </div>
                <div className="cnUserBioRow">
                    <a href={url} target='_blank'>{url}</a>
                </div>
            </div>
        </div>
    );
};

export default UserBio;