import { Protected } from "@/context/Protected";
import { StoreActivationForm } from "@/modules/store/components/CreateStoreForm/StoreActivationForm";
import { useAppSelector } from "@/redux/utils";
import { FC } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { SellerLayout } from "./SellerLayout";
import {
    SellerCalculatorPage,
    SellerCreateStorePage,
    SellerHomePage,
    SellerLoginPage,
    SellerOrderPage,
    SellerOrdersPage,
    SellerProductSizesPage,
    SellerProductsPage,
    SellerProfilePage,
    SellerRegisterPage,
    SellerSettingsPage,
    SellerSupplyDetailsPage,
    SellerSupplyPage,
    SellerUpdateStorePage,
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
                    <Route
                        path="/settings/create-store"
                        element={<SellerCreateStorePage />}
                    />
                    <Route
                        path="/settings/update-store/:storeId/activate"
                        element={<StoreActivationForm />}
                    />
                    <Route
                        path="/settings/update-store/:storeId"
                        element={<SellerUpdateStorePage />}
                    />
                    <Route path="/profile" element={<SellerProfilePage />} />
                    <Route path="/products" element={<SellerProductsPage />} />
                    <Route path="/supply" element={<SellerSupplyPage />} />
                    <Route
                        path="/supply/:supplyId"
                        element={<SellerSupplyDetailsPage />}
                    />
                    <Route
                        path="/supply/create"
                        // element={<SellerSupplyCreatePage />}
                    />
                    <Route
                        path="/calculator"
                        element={<SellerCalculatorPage />}
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
