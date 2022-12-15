import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import UserBadge from "../UserBadge";
import './styles.css';
import Comments from "../Comments";
import {useDispatch} from "react-redux";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import InputForm from "../InputForm";
import {sendCommentOnUserPage} from "../../redux/actions/postsByUser";

const PhotoModal = ({
                        isOpen, onClose, imgUrl, authorNickName, avatarUrl,
                        authorId, comments, photoId, userNickname, isLikedByYou, onLikeClick, value, setValue, userId
                    }) => {
    const dispatch = useDispatch();
    const [error, setError] = useState(false)

    useEffect(() => {

        const body = document.querySelector('body');
        if (isOpen) {
            body.classList.add('cnModalOverflow');
        } else {
            body.classList.remove('cnModalOverflow');

        }
    }, [isOpen]);


    const textareaHandler = (e) => {
        console.log({userNickname, photoId, userId, value})
        e.preventDefault();
        if (value) {
            dispatch(sendCommentOnUserPage(userNickname, photoId, userId, value))
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
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className='cnModal'
            overlayClassName='cnModalOverlay'
            ariaHideApp={false}
        >
            <div className="cnModalRoot">
                <div className="cnModalWrapper">
                    <img src={imgUrl} alt={imgUrl} className='cnModalImage'/>
                </div>
                <div className="cnModalCommentsBlock">
                    <div className="cnModalItems">
                        <div className="">
                            <UserBadge nickName={authorNickName} avatarUrl={avatarUrl} id={authorId}/>
                            <hr/>
                        </div>
                        <div className="">
                            {
                                comments.map((comment, index) =>
                                    <Comments {...comment} key={index}/>
                                )
                            }
                        </div>
                    </div>

                    <form className="cnDetailedCardForm">
                        <div className="cnDetailedCardLikesBtn" onClick={onLikeClick}>
                            {
                                isLikedByYou ? <AiFillHeart/> : <AiOutlineHeart/>
                            }
                        </div>
                        {/*<input className={`cnDetailedCardText ${error && "error"}`}*/}
                        {/*       placeholder='Введите коментарий'*/}
                        {/*       value={value} onChange={(e) => setValue(e.target.value)}*/}
                        {/*/>*/}
                        <InputForm error={error} value={value} setValue={setValue}/>
                        <button type='submit'
                                className="cnDetailedCardSendBtn"
                                onClick={(e) => textareaHandler(e)}>Send
                        </button>
                    </form>
                </div>
            </div>

        </Modal>
    );
};

export default PhotoModal;