import {api} from "../../api";
import {
    getAuthorizedFailed,
    getAuthorizedStarted,
    getAuthorizedSuccess,
    getUserFailed,
    getUserStarted,
    getUserSuccess
} from "../actionCreators/users";

export const getUser = (id) => {
    return async (dispatch) => {
        try {
            dispatch(getUserStarted());
            const response = await api.users.getUserAPI(id);
            dispatch(getUserSuccess(response.data));
        } catch (e) {
            dispatch(getUserFailed(e));
        }
    }
} // это middleware thunk для асинхр. запросов

export const getAuthorizedUser = () => {
    return async (dispatch) => {
        try {
            dispatch(getAuthorizedStarted());
            const response = await api.users.getUserAPI(1);
            dispatch(getAuthorizedSuccess(response.data));
        } catch (e) {
            dispatch(getAuthorizedFailed(e));
        }
    }
}