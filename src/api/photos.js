import {makeRequest} from "./makeRequest";

const URL = '/posts';

export const getPhotosAPI = (config) => makeRequest({
    method: 'GET',
    url: URL,
    ...config,
});


export const  mutatePhotoAPI = (config) => {
    config.url = `${URL}/${config.url}`;
    return makeRequest({
        method: 'PUT',
        ...config
    })
}