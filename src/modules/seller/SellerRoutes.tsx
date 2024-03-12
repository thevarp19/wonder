import { Protected } from "@/context/Protected";
import { FC } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
    SellerEmailConfirmPage,
    SellerLoginPage,
    SellerRegisterPage,
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
                        checkAction={async () => false}
                        navigate={navigateToSellerLogin}
                    />
                }
            >
                <Route index path="/" element={<div>Admin</div>} />
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
