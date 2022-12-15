import React, {useState} from 'react';
import './style.css';

import {AiFillHeart, AiOutlineComment, AiOutlineHeart} from 'react-icons/ai';
import PhotoModal from "../PhotoModal";

const Card = ({isLikedByYou, imgUrl, likes, comments, onLikeClick, author, authorizedUser, photoId}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [value, setValue] = useState('');


    return (
        <div className='cnCardRoot'>
            <img src={imgUrl}
                 alt="posts"
                 className='cnCardImage'
            />
            <div className="cnCardHover"></div>
            <div className="cnCardInfo">
                <span onClick={onLikeClick}>{likes.length} {
                    isLikedByYou ? <AiFillHeart/> : <AiOutlineHeart/>
                }</span>
                <span onClick={() => setIsModalVisible(true)}>{comments.length}<AiOutlineComment/></span>
            </div>
            <PhotoModal authorNickName={author.nickname}
                        avatarUrl={author.avatarUrl}
                        authorId={author.id}
                        comments={comments}
                        imgUrl={imgUrl}
                        onClose={() => setIsModalVisible(false)}
                        isOpen={isModalVisible}
                        photoId={photoId}
                        userNickname={authorizedUser.nickname}
                        userId={authorizedUser.id}
                        isLikedByYou={isLikedByYou}
                        onLikeClick={onLikeClick}
                        value={value}
                        setValue={setValue}
            />
        </div>
    );
};

export default Card;