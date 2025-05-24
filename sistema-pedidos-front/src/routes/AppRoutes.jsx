
import { Route, Routes } from "react-router-dom";
import CadastroPage from "../pages/CadastroPage"
import LoginPage from "../pages/LoginPage"

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/login-page" element={<LoginPage/>}></Route>
            <Route path="/cadastro" element={<CadastroPage/>}></Route>
            <Route path="/"></Route>
        </Routes>
    )
}

export default AppRoutes;