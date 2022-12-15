import {GET_POSTS_FAILED, GET_POSTS_STARTED, GET_POSTS_SUCCESS} from "../actionCreators/postsByUser";

const initialState = {
    posts: [],
    isPostLoading: true
}


export const postsByUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POSTS_STARTED:
            return {
                ...state,
                isPostLoading: true
            };
        case GET_POSTS_SUCCESS:
            return {
                ...state,
                isPostLoading: false,
                posts: action.payload
            };
        case GET_POSTS_FAILED:
            return {
                ...state,
                isPostLoading: false
            };
        default:
            return {
                ...state
            }
    }
}