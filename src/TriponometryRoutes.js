import {BrowserRouter, Route} from "react-router-dom";
import {Routes, Navigate} from "react-router";
import App from "./App";
import {ExplorerPage} from "./component/pages/ExplorerPage";
import {MyCalculationsPage} from "./component/pages/MyCalculationsPage";
import {NewCalculationPage} from "./component/pages/NewCalculationPage";
import {MyCalculationPage} from "./component/pages/MyCalculationPage";
import {LandingPage} from "./component/pages/LandingPage";
import {LoginPage} from "./component/pages/LoginPage";
import {SignUpPage} from "./component/pages/SignUpPage";
import {useState, useEffect} from "react";
import {checkLogin, logout} from "./BackendService";
import {NotFound} from "./component/pages/NotFoundPage";
import {ExploredCalculationPage} from "./component/pages/ExploredCalculationPage";
import { EditCalculationPage } from "./component/pages/EditCalculationPage";
import { PlantillaCalculationPage } from "./component/pages/PlantillaCalculationPage";
import { SpinnerSearchBox } from "./component/utils/SpinnerSearchBox";

export function TriponometryRoutes() {

    const [username , setUsername] = useState("")
    const [pfp, setPfp] = useState("")
    const [isGoogle, setIsGoogle] = useState(false)

    const [isBusy, setIsBusy] = useState(true)

    useEffect(() => {
        checkLogin()
            .then((response) => {
                if (response?.status !== "Error") {         
                    changeAvatar(response.username, "", response.googleAccount)
                } 
                setIsBusy(false)
            })
    }, []);

    
    const handleLogout = async () => {
        const response = await logout()
        if (response?.status !== "Error")
            changeAvatar("", "", false)
    }
    
    const changeAvatar = (username, pfp, isGoogle) => {
        setUsername(username)
        setPfp(pfp)
        setIsGoogle(isGoogle)
    }

    const handleCookieExpired = () => {
        changeAvatar("","",false)
    }

    const isLoggedIn = () =>{
        return username !== ""
    }

    if (isBusy){
        return <SpinnerSearchBox/>
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<App username={username} pfp={pfp} isGoogle={isGoogle} logout={handleLogout}/>}>
                    <Route path="" exact element={(!isLoggedIn() ? (<LandingPage/>) : (<Navigate to="/mis-calculos" />))}/>
                    <Route path="sign-in" exact element={(!isLoggedIn() ? (<LoginPage changeAvatar={changeAvatar}/>) : (<Navigate to="/mis-calculos" />))}/>
                    <Route path="sign-up" exact element={(!isLoggedIn() ? (<SignUpPage changeAvatar={changeAvatar}/>) : (<Navigate to="/mis-calculos" />))}/>
                    <Route path="nuevo" exact element={(<NewCalculationPage edit={false} beginInput='CITY' loggedIn={isLoggedIn()} logout={handleCookieExpired}/>)}/>
                    <Route path="explorar" exact element={(!isLoggedIn() ? (<Navigate to="/"/>) : (<ExplorerPage logout={handleCookieExpired}/>))}/>
                    <Route path="explorar/:id" exact element={(!isLoggedIn() ? (<Navigate to="/"/>) : (<ExploredCalculationPage logout={handleCookieExpired} />))}/>
                    <Route path="explorar/:id/edicion" exact element={(!isLoggedIn() ? (<Navigate to="/"/>) : (<PlantillaCalculationPage logout={handleCookieExpired}/>))}/>
                    <Route path="mis-calculos" exact element={(!isLoggedIn() ? (<Navigate to="/"/>) : (<MyCalculationsPage logout={handleCookieExpired} />))}/>
                    <Route path="mis-calculos/:id" exact element={(!isLoggedIn() ? (<Navigate to="/"/>) : (<MyCalculationPage logout={handleCookieExpired} />))}/>
                    <Route path="mis-calculos/:id/edicion" exact element={(!isLoggedIn() ? (<Navigate to="/"/>) : (<EditCalculationPage logout={handleCookieExpired}/>))}/>
                    <Route path={'*'} element={<NotFound/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}