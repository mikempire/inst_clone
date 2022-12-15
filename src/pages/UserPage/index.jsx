import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import {useDispatch, useSelector} from "react-redux";
import UserBio from "../../components/UserBio";
import Card from "../../components/Card";
import {getPostByUser, toggleLikeOnPost} from "../../redux/actions/postsByUser";
import Loader from "../../components/Loader";
import {useParams} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import {Bars} from "react-loader-spinner";
import {getUser} from "../../redux/actions/users";
import './styles.css';


const UserPage = () => {
    const {authorizedUser, user, isUserLoading} = useSelector(state => state.users);
    const {isPostLoading, posts} = useSelector(state => state.postsByUser);

    const dispatch = useDispatch();
    const {id:postAuthorId } = useParams(); // postAuthorId
    const [postForRender, setPostForRender] = useState([]);
    const [page, setPage] = useState(0);


    useEffect(() => {
        const newPosts = [...posts];

        if (newPosts.length) {
            setPostForRender(newPosts.splice(0, 12));
        }
    }, [posts])

    useEffect(() => {
        dispatch(getUser(postAuthorId));
        dispatch(getPostByUser(postAuthorId));
    }, [postAuthorId])


    const onLikeClick = (photoId) => {
        dispatch(toggleLikeOnPost(authorizedUser.id, photoId, postAuthorId))
    }

    const nextHandler = () => {
        const newPosts = [...posts];
        const offset = 12 * (page + 1);
        setPostForRender([...postForRender, ...newPosts.splice(offset, offset + 12)]);
        setPage(page + 1);
    }

    if (isPostLoading || isUserLoading) {
        return (
            <Loader/>
        )
    }
    return (
        <Layout nickName={authorizedUser.nickname} id={authorizedUser.id} avatarUrl={authorizedUser.avatarUrl}>
            <div className="cnUserPageRoot">
                <UserBio
                    avatarUrl={user.avatarUrl}
                    description={user.description}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    nickname={user.nickname}
                    url={user.url}
                    subscribed={user.subscribed.length}
                    subscribers={user.subscribers.length}
                />
                <div className="cnUserPageLine">
                    {
                        postForRender.length ? <InfiniteScroll
                                dataLength={postForRender.length}
                                next={nextHandler}
                                hasMore={posts.length > postForRender.length}
                                loader={
                                    <div className="cnMainLoaderBottom">
                                        <Bars color="#000BFF" width={15} height={15}/>
                                    </div>
                                }
                                endMessage={
                                    <p className='cnMainLoaderBottom'>That's all!</p>
                                }
                            >
                                {
                                    postForRender.map(({
                                                           imgUrl,
                                                           likes,
                                                           comments,
                                                           id,
                                                           author
                                                       }) =>
                                        <Card isLikedByYou={likes.includes(authorizedUser.id)}
                                              imgUrl={imgUrl}
                                              likes={likes}
                                              comments={comments}
                                              key={id}
                                              onLikeClick={() => onLikeClick(id)}
                                              author={author}
                                              photoId={id}
                                              authorizedUser={authorizedUser}
                                        />
                                    )
                                }
                            </InfiniteScroll> :
                            <p className='cnMainLoaderBottom'> User dont have posts!</p>
                    }

                </div>
            </div>
        </Layout>
    );
};

export default UserPage;


/*
    const onCommentSendClick = (postId) => {
        dispatch(sendCommentOnUserPage(authorizedUser.nickname, postId, postAuthorId,  ))
    }

 */