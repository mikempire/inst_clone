import React, {useState} from 'react';
import {nanoid} from "nanoid";
import UserBadge from "../UserBadge";
import {AiFillHeart} from 'react-icons/ai';
import {AiOutlineHeart} from 'react-icons/ai';
import {AiOutlineComment} from 'react-icons/ai';

import './styles.css';
import Comments from "../Comments";

const DetailedCard = ({
                          author,
                          imgUrl,
                          likes,
                          isLikedByYou,
                          comments
                      }) => {
    const [commentsShow, setCommentsShow] = useState(false);

    const renderComments = () => {
        if (comments.length > 2 && commentsShow === false) {
            const commentsForRender = comments.slice(comments.length - 2, comments.length);
            return (
                <>
                    <button className="cnDetailedCardOpen"
                            onClick={() => setCommentsShow(true)}
                    >{`Показать еще ${comments.length - commentsForRender.length} комментариев`}</button>
                    {
                        commentsForRender.map((comment, index) =>
                            <Comments {...comment} key={nanoid()}/>
                        )
                    }
                </>
            )
        }

        return comments.map((comment, index) =>
            <Comments {...comment} key={index}/>
        )
    }

    return (
        <div className="cnDetailedCardRoot">
            <div className="cnDetailedCardHeader">
                <UserBadge nickName={author.nickname} avatarUrl={author.avatarUrl} id={3}/>
            </div>
            <div className="cnDetailedCardImage">
                <img src={imgUrl} alt=""/>
            </div>
            <div className="cnDetailedCardButtons">
                {
                    isLikedByYou ? <AiFillHeart/> : <AiOutlineHeart/>
                }
                <AiOutlineComment/>
            </div>
            <div className="cnDetailedCardLikes">
                Оценили {likes.length} человек
            </div>
            <div className="cnDetailedCardComments">
                {
                    renderComments()
                }
            </div>
            <textarea name="" className="cnDetailedCardText"></textarea>
        </div>
    );
};

export default DetailedCard;




/*
const comments = [
    {
        "nickname": "IUvan222",
        "text": "awesome!"
    },
    {
        "nickname": "vosdux",
        "text": "asdassss\n"
    },
    {
        "nickname": "vosdux",
        "text": "asd\n"
    },
    {
        "nickname": "vosdux",
        "text": "asd\n"
    },
    {
        "nickname": "vosdux",
        "text": "asd\n"
    },
    {
        "nickname": "vosdux",
        "text": "last"
    }
]
 */