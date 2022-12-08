export const GET_PHOTOS_SUCCESS = 'GET_PHOTOS_SUCCESS';
export const GET_PHOTOS_FAILED = 'GET_PHOTOS_FAILED';
export const GET_PHOTOS_STARTED = 'GET_PHOTOS_STARTED';
export const SET_TOTAL_PHOTOS = 'SET_TOTAL_PHOTOS';


export const getPhotosSuccess = (photos) => ({
    type: GET_PHOTOS_SUCCESS,
    payload: photos
})

export const getPhotosFailed = (error) => ({
    type: GET_PHOTOS_SUCCESS,
    payload: error
})

export const getPhotosStarted = () => ({
    type: GET_PHOTOS_STARTED,
})

export const setTotalPhotos = (total) => ({
    type: SET_TOTAL_PHOTOS,
    payload: total
})