import { Protected } from "@/context/Protected";
import { ProductsUploadInstructionsCollapse } from "@/modules/product/components/ProductsUploadInstructions/ProductInstructionCollapse";
import { ProductsUploadInstructionsAuto } from "@/modules/product/components/ProductsUploadInstructions/ProductsUploadInstructionsAuto";
import { StoreActivationForm } from "@/modules/store/components/CreateStoreForm/StoreActivationForm";
import { useAppSelector } from "@/redux/utils";
import { FC } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { SellerLayout } from "./SellerLayout";
import {
    SellerArchiveOrdersPage,
    SellerBalancePage,
    SellerCalculatorPage,
    SellerCreateStorePage,
    SellerHomePage,
    SellerLoginPage,
    SellerOrderAssemblePage,
    SellerOrderCancelledPage,
    SellerOrderPackagePage,
    SellerOrderPage,
    SellerOrderShippedPage,
    SellerOrdersPage,
    SellerOrderTransferPage,
    SellerOwnOrdersPage,
    SellerProductSizesPage,
    SellerProductsPage,
    SellerProfilePage,
    SellerRegisterPage,
    SellerServiceParamsPage,
    SellerSettingsPage,
    SellerSupplyCreatePage,
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
                    <Route
                        path="/products/upload/instruction"
                        element={<ProductsUploadInstructionsCollapse />}
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
                    <Route
                        path="/calculator"
                        element={<SellerCalculatorPage />}
                    />
                    <Route path="/orders" element={<SellerOrdersPage />} />
                    <Route
                        path="/my-orders"
                        element={<SellerOwnOrdersPage />}
                    />
                    <Route
                        path="/my-orders/package"
                        element={<div>Coming soon!</div>}
                    />
                    <Route
                        path="/my-orders/transfer"
                        element={<div>Coming soon!</div>}
                    />
                    <Route
                        path="/my-orders/shipped"
                        element={<div>Coming soon!</div>}
                    />
                    <Route
                        path="/my-orders/cancelled"
                        element={<div>Coming soon!</div>}
                    />
                    <Route
                        path="/orders/assemble"
                        element={<SellerOrderAssemblePage />}
                    />
                    <Route
                        path="/orders/package"
                        element={<SellerOrderPackagePage />}
                    />
                    <Route
                        path="/orders/transfer"
                        element={<SellerOrderTransferPage />}
                    />
                    <Route
                        path="/orders/shipped"
                        element={<SellerOrderShippedPage />}
                    />
                    <Route
                        path="/orders/cancelled"
                        element={<SellerOrderCancelledPage />}
                    />
                    <Route
                        path="/orders/new"
                        element={<div>Coming soon!</div>}
                    />
                    <Route
                        path="/orders/signing"
                        element={<div>Coming soon!</div>}
                    />
                    <Route
                        path="/orders/archive"
                        element={<SellerArchiveOrdersPage />}
                    />
                    <Route
                        path="/service-params"
                        element={<SellerServiceParamsPage />}
                    />
                    <Route path="/balance" element={<SellerBalancePage />} />
                    <Route
                        path="/orders/:orderId"
                        element={<SellerOrderPage />}
                    />
                    <Route path="/sizes" element={<SellerProductSizesPage />} />
                </Route>
            </Route>
            <Route path="/login" element={<SellerLoginPage />} />
            <Route path="/register" element={<SellerRegisterPage />} />
            <Route
                path="/auto-upload-instruction"
                element={
                    <div className="flex justify-center px-20 py-10">
                        <ProductsUploadInstructionsAuto />
                    </div>
                }
            />
        </Routes>
    );
};
