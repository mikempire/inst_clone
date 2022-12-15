import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import DetailedCard from "../../components/DetailedCard";
import {useDispatch, useSelector} from "react-redux";
import {getPhotos, toggleLike} from "../../redux/actions/photos";
import InfiniteScroll from "react-infinite-scroll-component";
import {Bars} from "react-loader-spinner";
import './styles.css';
import Loader from "../../components/Loader";

const MainPage = () => {

    const {photos, isPhotosLoading, totalPhotos } = useSelector(state => state.photos);
    const {authorizedUser} = useSelector(state => state.users);
    const dispatch = useDispatch();

    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(getPhotos(page));
    }, [page]);

    const nextHandler = () => {
        setPage(page + 1)
    }

    const onLikeClick = (userId, photoId) => {
        dispatch(toggleLike(userId, photoId))
    }

    if (isPhotosLoading) {
        return (
            <Loader/>
        )
    }
    return (
        <Layout nickName={authorizedUser.nickname} id={authorizedUser.id} avatarUrl={authorizedUser.avatarUrl}>
            <InfiniteScroll dataLength={photos.length}
                            next={nextHandler}
                            hasMore={totalPhotos > photos.length}
                            loader={
                                <div className="cnMainLoaderBottom">
                                    <Bars color="#000BFF" width={15} height={15}/>
                                </div>
                            }
                            endMessage={
                                <p className='cnMainLoaderBottom'>That's all!</p>
                            }
            >
                <>
                    {
                        photos.map((el) =>
                            <DetailedCard {...el}
                                          key={el.id}
                                          isLikedByYou={el.likes.includes(authorizedUser.id)}
                                          onLikeClick={onLikeClick}
                                          userId={authorizedUser.id}
                                          userNickname={authorizedUser.nickname}
                            />
                        )
                    }
                </>
            </InfiniteScroll>
        </Layout>
    );
};

export default MainPage;