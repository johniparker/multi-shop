import { Routes, Route} from "react-router-dom";
import ProductPage from "../../pages/ProductPage";
import LoginPage from "../../pages/LoginPage";

const RouterProvider = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<ProductPage />} />
        </Routes>
    )
}

export default RouterProvider;