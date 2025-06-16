
import { Route, Routes } from "react-router-dom";
import CadastroPage from "../pages/CadastroPage"
import LoginPage from "../pages/LoginPage"
import HomePage from "../pages/HomePage";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import DashboardPage from "../pages/DashboardPage";

const AppRoutes = () => {
    return(
        <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path="/login-page" element={<LoginPage/>}></Route>
            <Route path="/cadastro" element={<CadastroPage/>}></Route>
            <Route element={<ProtectedRoute/>}>
                <Route path="/dashboard" element={<DashboardPage/>}></Route>
            </Route>
        </Routes>
    )
}

export default AppRoutes;