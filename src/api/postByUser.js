import {makeRequest} from "./makeRequest";
const URL = '/postsByUser';

export const getPostsByUserAPI = (config) => {
    config.url = `${URL}/${config.url}`;
    return makeRequest({
        method: 'GET',
        ...config
    })
}

export const mutatePostsAPI = (config) => {
    config.url = `${URL}/${config.url}`;
    return makeRequest({
        method: 'PUT',
        ...config
    })
}