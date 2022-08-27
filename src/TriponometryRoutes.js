import {BrowserRouter, Route} from "react-router-dom";
import {Routes, useLocation} from "react-router";
import App from "./App";
import {ExplorerPage} from "./component/pages/ExplorerPage";
import {MyCalculationsPage} from "./component/pages/MyCalculationsPage";
import { NewCalculationPage } from "./component/pages/NewCalculationPage";
import { LoginPage } from "./component/pages/LoginPage";
import { SignUpPage } from "./component/pages/SignUpPage";
import { useState } from "react";


const NotFound = () => {
    const {pathname} = useLocation();
    return <div>
        <p>Por aqui no es... '{pathname}' no existe</p>
    </div>
}

export function TriponometryRoutes() {
    const [username , setUsername] = useState("")
    const [pfp, setPfp] = useState("")
    
    const changeAvatar = (username, pfp) => {
        setUsername(username)
        setPfp(pfp)
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<App username={username} pfp={pfp}/>}>
                    <Route path="" exact element={<LoginPage changeAvatar={changeAvatar}/>}/>
                    <Route path="nuevo" exact element={<NewCalculationPage/>}/>
                    <Route path="sign-up" exact element={<SignUpPage changeAvatar={changeAvatar}/>}/>
                    <Route path="explorar" exact element={<ExplorerPage/>}/>
                    <Route path="mis-calculos" exact element={<MyCalculationsPage/>}/>
                    <Route path={'*'} element={<NotFound/>}/>
                </Route>
            </Routes>
        </BrowserRouter>)
}