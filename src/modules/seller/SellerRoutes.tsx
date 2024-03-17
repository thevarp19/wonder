import { Protected } from "@/context/Protected";
import { FC } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { SellerLayout } from "./SellerLayout";
import {
    SellerEmailConfirmPage,
    SellerLoginPage,
    SellerProductsPage,
    SellerProductsUploadPage,
    SellerRegisterPage,
    SellerSettingsPage,
} from "./pages";

interface SellerRoutesProps {}

export const SellerRoutes: FC<SellerRoutesProps> = ({}) => {
    const navigate = useNavigate();
    const navigateToSellerLogin = () => {
        navigate("/seller/login", { replace: true });
    };
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Protected
                        checkAction={async () => true}
                        navigate={navigateToSellerLogin}
                    />
                }
            >
                <Route path="/" element={<SellerLayout />}>
                    <Route index path="/" element={<div>Seller</div>} />
                    <Route path="/settings" element={<SellerSettingsPage />} />
                    <Route path="/products" element={<SellerProductsPage />} />
                    <Route
                        path="/products/upload"
                        element={<SellerProductsUploadPage />}
                    />
                </Route>
            </Route>
            <Route path="/login" element={<SellerLoginPage />} />
            <Route path="/register" element={<SellerRegisterPage />} />
            <Route
                path="/register/confirm"
                element={<SellerEmailConfirmPage />}
            />
        </Routes>
    );
};
