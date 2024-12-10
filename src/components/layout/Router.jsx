import { Routes, Route} from "react-router-dom";
import ProductPage from "../../pages/ProductPage";

const RouterProvider = () => {
    return (
        <Routes>
            <Route path="/" element={<ProductPage />} />
        </Routes>
    )
}

export default RouterProvider;