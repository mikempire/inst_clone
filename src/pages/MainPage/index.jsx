import React, {useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import DetailedCard from "../../components/DetailedCard";
import {useDispatch, useSelector} from "react-redux";
import {getPhotos} from "../../redux/actions/photos";
import InfiniteScroll from "react-infinite-scroll-component";
import {Bars} from "react-loader-spinner";
import './styles.css';

const MainPage = () => {

    const {photos, isPhotosLoading, totalPhotos } = useSelector(state => state.photos);
    const dispatch = useDispatch();

    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(getPhotos(page));

    }, [page]);

    const nextHandler = () => {
        setPage(page + 1)
    }

    if (isPhotosLoading) {
        return (
            <div className="cnMainLoaderContainer">
                <Bars color="#000BFF" width={80} height={80}/>
            </div>
        )
    }
    return (
        <Layout nickName={'Petr'} id={1}>
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
                            <DetailedCard {...el} key={el.id} isLikedByYou={true}/>
                        )
                    }
                </>
            </InfiniteScroll>
        </Layout>
    );
};

export default MainPage;