import {BrowserRouter, Route} from "react-router-dom";
import {Routes, useLocation} from "react-router";
import App from "./App";
import {CalculatorPage} from "./component/pages/CalculatorPage";
import {ExplorerPage} from "./component/pages/ExplorerPage";
import {MyCalculationsPage} from "./component/pages/MyCalculationsPage";
import {ResultPage} from "./component/pages/ResultPage";

const NotFound = () => {
    const {pathname} = useLocation();
    return <div>
        <p>Por aqui no es... '{pathname}' no existe</p>
    </div>
}

export function TriponometryRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={'/'} element={<App/>}>
                    <Route path="" exact element={<CalculatorPage/>}/>
                    <Route path="explorar" exact element={<ExplorerPage/>}/>
                    <Route path="mis-calculos" exact element={<MyCalculationsPage/>}/>
                    <Route path="resultado" exact element={<ResultPage/>}/>
                    <Route path={'*'} element={<NotFound/>}/>
                </Route>
            </Routes>
        </BrowserRouter>)
}