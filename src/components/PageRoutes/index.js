import {useDispatch, useSelector} from "react-redux";
import MainPage from "../../pages/MainPage";
import UserPage from "../../pages/UserPage";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NoAccessPage from "../../pages/NoAccessPage";
import React, {useEffect} from "react";
import {getAuthorizedUser} from "../../redux/actions/users";
import Loader from "../Loader";
import {nanoid} from "nanoid";

const authorizedRoutes = [
    { path: '/', element: <MainPage/>, exact: true},
    { path: '/:id', element: <UserPage/>,},
];


const PageRoutes = () => {
    const authorizedUser = useSelector(state => state.users.authorizedUser);
    const isLoading = useSelector(state => state.users.isAuthorizedUserLoading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAuthorizedUser());
    }, []);



    if (isLoading) {
        return (
            <Loader/>
        )
    }

    return (
        <BrowserRouter>
            <Routes>
                {
                    authorizedUser ? authorizedRoutes.map((route) => <Route {...route} key={nanoid()}/>)
                        : <Route path="/" element={<NoAccessPage/>} exact/>
                }
            </Routes>
        </BrowserRouter>
    )
}

export default PageRoutes;