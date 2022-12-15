import {getPhotosAPI, mutatePhotoAPI} from "./photos";
import { getUserAPI} from "./users";
import {getPostsByUserAPI, mutatePostsAPI} from "./postByUser";

export const api = {
    photos: {
        getPhotosAPI,
        mutatePhotoAPI
    },
    users: {
        getUserAPI
    },
    postsByUser: {
        getPostsByUserAPI,
        mutatePostsAPI
    }
}