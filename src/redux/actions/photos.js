import {getPhotosFailed, getPhotosStarted, getPhotosSuccess, setTotalPhotos} from "../actionCreators/photos";
import {api} from "../../api";

export const getPhotos = (page = 1) => {
    return async (dispatch, getState) => {
        try {
            const {photos} = getState();
            if (page === 1) {
                dispatch(getPhotosStarted);
            }

            const response = await api.photos.getPhotos({
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