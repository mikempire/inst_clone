import React, {useState} from 'react';
import {nanoid} from "nanoid";
import UserBadge from "../UserBadge";
import {AiFillHeart, AiOutlineComment, AiOutlineHeart} from 'react-icons/ai';

import './styles.css';
import Comments from "../Comments";
import {sendComment} from "../../redux/actions/photos";
import {useDispatch} from "react-redux";
import PhotoModal from "../PhotoModal";
import InputForm from "../InputForm";

const DetailedCard = ({
                          author,
                          imgUrl,
                          likes,
                          isLikedByYou,
                          comments,
                          onLikeClick,
                          id,
                          userId,
                          userNickname
                      }) => {
    const [commentsShow, setCommentsShow] = useState(false);
    const [value, setValue] = useState('');
    const [error, setError] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const dispatch = useDispatch();

    const renderComments = () => {
        if (comments.length > 2 && commentsShow === false) {
            const commentsForRender = comments.slice(comments.length - 2, comments.length);
            return (
                <>
                    <button className="cnDetailedCardOpen"
                            onClick={() => setCommentsShow(true)}
                    >{`Показать еще ${comments.length - commentsForRender.length} комментариев`}</button>
                    {
                        commentsForRender.map((comment) =>
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

    const textareaHandler = (e) => {
        e.preventDefault();
        if (value) {
            dispatch(sendComment(userNickname, id, value));
            setValue('');
            setError(false)
        } else {
            setError(true);

            setTimeout(() => {
                setError(false);
            }, 1500)
        }
    }

    return (
        <div className="cnDetailedCardRoot">
            <div className="cnDetailedCardHeader">
                <UserBadge nickName={author.nickname} avatarUrl={author.avatarUrl} id={author.id}/>
            </div>
            <div className="cnDetailedCardImage">
                <img src={imgUrl} alt=""/>
            </div>
            <div className="cnDetailedCardButtons">
                <div className="cnDetailedCardLikesBtn" onClick={() => onLikeClick(userId, id)}>
                    {
                        isLikedByYou ? <AiFillHeart/> : <AiOutlineHeart/>
                    }
                </div>
                <AiOutlineComment onClick={() => setIsModalVisible(true)}/>
            </div>
            <div className="cnDetailedCardLikes">
                Оценили {likes.length} человек
            </div>
            <div className="cnDetailedCardComments">
                {
                    renderComments()
                }
            </div>
            <form className="cnDetailedCardForm">
                <InputForm error={error} value={value} setValue={setValue}/>
                <button type='submit'
                        className="cnDetailedCardSendBtn"
                        onClick={(e) => textareaHandler(e)}>Send
                </button>
            </form>
            <PhotoModal authorNickName={author.nickname}
                        avatarUrl={author.avatarUrl}
                        comments={comments}
                        imgUrl={imgUrl}
                        userId={author.id}
                        onClose={() => setIsModalVisible(false)}
                        isOpen={isModalVisible}
                        photoId={id}
                        userNickname={userNickname}
                        isLikedByYou={isLikedByYou}
                        onLikeClick={() => onLikeClick(userId, id)}
                        error={error} value={value} setValue={setValue}
                        setError={setError}
            />
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