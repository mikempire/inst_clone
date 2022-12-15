import {
    getPhotosFailed,
    getPhotosStarted,
    getPhotosSuccess, mutatePhotosFailed, mutatePhotosStarted,
    mutatePhotosSuccess,
    setTotalPhotos
} from "../actionCreators/photos";
import {api} from "../../api";
import {getPhotoFromState, getUpdatedPhotoForState} from "../../utils";

export const getPhotos = (page = 1) => {
    return async (dispatch, getState) => {
        try {
            const {photos} = getState();
            if (page === 1) {
                dispatch(getPhotosStarted);
            }

            const response = await api.photos.getPhotosAPI({
                params: {
                    _page: page,
                    _limit: 5
                }
            });

            if (page === 1) {
                dispatch(setTotalPhotos(response.headers['x-total-count']));
                dispatch(getPhotosSuccess([...response.data]));
            } else {
                dispatch(getPhotosSuccess([...photos.photos, ...response.data]));
            }

        } catch (e) {
            dispatch(getPhotosFailed(e));
        }
    }
}


export const toggleLike = (userId, photoId) => {
    return async (dispatch, getState) => {
        dispatch(mutatePhotosStarted())

        const state = getState();
        const photo = getPhotoFromState(state.photos.photos, photoId);
        const newPhoto = {
            ...photo,
            likes: [...photo.likes]
        }

        if (newPhoto.likes.includes(userId)) {
            newPhoto.likes = newPhoto.likes.filter(like => like !== userId)
        } else {
            newPhoto.likes.push(userId)
        }

        console.log('newPhoto', newPhoto)

        try {
            const response = await api.photos.mutatePhotoAPI({
                data: newPhoto,
                url: `${photoId}`
            })

            const newPhotos = getUpdatedPhotoForState(state.photos.photos, photoId, response.data)

            dispatch(getPhotosSuccess(newPhotos))
            dispatch(mutatePhotosSuccess())
        } catch (e) {
            dispatch(mutatePhotosFailed(e));
        }
    }
}

export const sendComment = (nickname, photoId, text) => {
    return async (dispatch, getState) => {
        dispatch(mutatePhotosStarted())
        const state = getState();
        const newPhoto = state.photos.photos.find(elem => elem.id === photoId);

        newPhoto.comments.push({nickname, text});

        try {
            const response = await api.photos.mutatePhotoAPI({
                data: newPhoto,
                url: `${photoId}`
            })

            const newPhotos = getUpdatedPhotoForState(state.photos.photos, photoId, response.data)

            dispatch(getPhotosSuccess(newPhotos))
            dispatch(mutatePhotosSuccess())
        } catch (e) {
            dispatch(mutatePhotosFailed(e));
        }

    }

}