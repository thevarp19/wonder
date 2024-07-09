import { Protected } from "@/context/Protected";
import { useAppSelector } from "@/redux/utils";
import { FC } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { SellerLayout } from "./SellerLayout";
import {
    SellerHomePage,
    SellerLoginPage,
    SellerOrderPage,
    SellerOrdersPage,
    SellerProductSizesPage,
    SellerProductsPage,
    SellerProductsUploadPage,
    SellerProfilePage,
    SellerRegisterPage,
    SellerSettingsPage,
    SellerSupplyCreatePage,
    SellerSupplyDetailsPage,
    SellerSupplyPage,
} from "./pages";

interface SellerRoutesProps {}

export const SellerRoutes: FC<SellerRoutesProps> = ({}) => {
    const navigate = useNavigate();
    const navigateToSellerLogin = () => {
        navigate("/seller/login", { replace: true });
    };
    const sellerAuth = useAppSelector((state) => state.seller.auth);
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Protected
                        checkAction={async () => {
                            return sellerAuth.isLoggedIn;
                        }}
                        navigate={navigateToSellerLogin}
                    />
                }
            >
                <Route path="/" element={<SellerLayout />}>
                    <Route index path="/" element={<SellerHomePage />} />
                    <Route path="/settings" element={<SellerSettingsPage />} />
                    <Route path="/profile" element={<SellerProfilePage />} />
                    <Route path="/products" element={<SellerProductsPage />} />
                    <Route
                        path="/products/upload"
                        element={<SellerProductsUploadPage />}
                    />
                    <Route path="/supply" element={<SellerSupplyPage />} />
                    <Route
                        path="/supply/:supplyId"
                        element={<SellerSupplyDetailsPage />}
                    />
                    <Route
                        path="/supply/create"
                        element={<SellerSupplyCreatePage />}
                    />
                    <Route path="/orders" element={<SellerOrdersPage />} />
                    <Route
                        path="/orders/:orderId"
                        element={<SellerOrderPage />}
                    />
                    <Route path="/sizes" element={<SellerProductSizesPage />} />
                </Route>
            </Route>
            <Route path="/login" element={<SellerLoginPage />} />
            <Route path="/register" element={<SellerRegisterPage />} />
        </Routes>
    );
};
