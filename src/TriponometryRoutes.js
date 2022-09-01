import {BrowserRouter, Route} from "react-router-dom";
import {Routes, useLocation, Navigate} from "react-router";
import App from "./App";
import {ExplorerPage} from "./component/pages/ExplorerPage";
import {MyCalculationsPage} from "./component/pages/MyCalculationsPage";
import { NewCalculationPage } from "./component/pages/NewCalculationPage";
import { LoginPage } from "./component/pages/LoginPage";
import { SignUpPage } from "./component/pages/SignUpPage";
import { useState, useEffect } from "react";
import { checkLogin, logout } from "./BackendService";
import {MyCalculationPage} from "./component/pages/MyCalculationPage";

const NotFound = () => {
    const {pathname} = useLocation();
    return <div>
        <p>Por aqui no es... '{pathname}' no existe</p>
    </div>
}

export function TriponometryRoutes() {
    const [username , setUsername] = useState("")
    const [pfp, setPfp] = useState("")

    useEffect(() => {
        const response = checkLogin()
            .then((response) => {
                if(response){         
                    changeAvatar(response.mail, "")
                }
            })
    }, []);

    const handleLogout = () => {
        logout()
        changeAvatar("", "")
    }
    
    const changeAvatar = (username, pfp) => {
        setUsername(username)
        setPfp(pfp)
    }

    const isLoggedIn = () =>{
        return username !== ""
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<App username={username} pfp={pfp} logout={handleLogout}/>}>
                    <Route path="" exact element={(!isLoggedIn() ? (<LoginPage changeAvatar={changeAvatar}/>) : (<Navigate to="/mis-calculos" />))}/>
                    <Route path="nuevo" exact element={<NewCalculationPage/>}/>
                    <Route path="sign-up" exact element={(!isLoggedIn() ? (<SignUpPage changeAvatar={changeAvatar}/>) : (<Navigate to="/mis-calculos" />))}/>
                    <Route path="explorar" exact element={(!isLoggedIn() ? (<Navigate to="/"/>) : (<ExplorerPage />))}/>
                    <Route path="mis-calculos" exact element={(!isLoggedIn() ? (<Navigate to="/"/>) : (<MyCalculationsPage />))}/>
                    <Route path="mis-calculos/:id" exact element={(!isLoggedIn() ? (<Navigate to="/"/>) : (<MyCalculationPage />))}/>
                    <Route path={'*'} element={<NotFound/>}/>
                </Route>
            </Routes>
        </BrowserRouter>)
}