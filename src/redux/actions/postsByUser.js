import {api} from "../../api";
import {getPostsFailed, getPostsStarted, getPostsSuccess} from "../actionCreators/postsByUser";
import {mutatePhotosFailed, mutatePhotosStarted, mutatePhotosSuccess} from "../actionCreators/photos";
import {getUserPagePostData} from "../../utils";

export const getPostByUser = (userId) => {
    return async (dispatch) => {
        dispatch(getPostsStarted());
        try {
            const response = await api.postsByUser.getPostsByUserAPI({
                url: userId
            });
            if (response.data.posts) {
                dispatch(getPostsSuccess(response.data.posts));
            }
        } catch (e) {
            dispatch(getPostsFailed(e));
        }
    }
}

export const toggleLikeOnPost = (userId, postId, postAuthorId) => {
    return async (dispatch, getState) => {
        try {
            const posts = getState().postsByUser.posts;
            const {newPosts, postForEdit} = getUserPagePostData(posts, postId);

            if (postForEdit.likes.includes(userId)) {
                postForEdit.likes = postForEdit.likes.filter(like => like !== userId)
            } else {
                postForEdit.likes.push(userId)
            }

            await api.postsByUser.mutatePostsAPI({
                url: postAuthorId,
                data: {
                    id: postAuthorId,
                    posts: newPosts
                }
            });

            dispatch(getPostsSuccess(newPosts))
        } catch (e) {
            console.log(e);
        }
    }
}

export const sendCommentOnUserPage = (nickname, postId, postAuthorId, text) => {
    return async (dispatch, getState) => {
        dispatch(mutatePhotosStarted())
        const posts = getState().postsByUser.posts;
        const {newPosts, postForEdit} = getUserPagePostData(posts, postId);
        postForEdit.comments.push({nickname, text});

        console.log('newPosts', newPosts)


        try {
            const response = await api.postsByUser.mutatePostsAPI({
                url: postAuthorId,
                data: {
                    id: postAuthorId,
                    posts: newPosts
                }
            });

            console.log('response', response.data.posts)
            dispatch(getPostsSuccess([...response.data.posts]));
            dispatch(mutatePhotosSuccess());
        } catch (e) {
            dispatch(mutatePhotosFailed(e));
        }

    }

}