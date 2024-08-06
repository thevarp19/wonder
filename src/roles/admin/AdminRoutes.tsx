import { Protected } from "@/context/Protected";
import { useAppSelector } from "@/redux/utils";
import { FC } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AdminLayout } from "./AdminLayout";
import {
    AdminLoginPage,
    AdminOrderAssemblePage,
    AdminOrderCancelledPage,
    AdminOrderPackagePage,
    AdminOrderPage,
    AdminOrderShippedPage,
    AdminOrdersPage,
    AdminOrderTransferPage,
    AdminSettingsPage,
    CreateBoxPage,
    CreateStorePage,
    StoreCellsPage,
    StoreEmployeesPage,
    UpdateStorePage,
} from "./pages";
import { AdminHomePage } from "./pages/AdminHomePage";

interface AdminRoutesProps {}

export const AdminRoutes: FC<AdminRoutesProps> = ({}) => {
    const navigate = useNavigate();
    const navigateToAdminLogin = () => {
        navigate("/admin/login", { replace: true });
    };
    const adminAuth = useAppSelector((state) => state.admin.auth);
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Protected
                        checkAction={async () => {
                            return adminAuth.isLoggedIn;
                        }}
                        navigate={navigateToAdminLogin}
                    />
                }
            >
                <Route path="/" element={<AdminLayout />}>
                    <Route index path="/" element={<AdminHomePage />} />
                    <Route path="/settings" element={<AdminSettingsPage />} />
                    <Route
                        path="/settings/create-store"
                        element={<CreateStorePage />}
                    />
                    <Route
                        path="/settings/update-store/:storeId"
                        element={<UpdateStorePage />}
                    />
                    <Route
                        path="/settings/create-box"
                        element={<CreateBoxPage />}
                    />
                    <Route
                        path="/settings/cells/:storeId"
                        element={<StoreCellsPage />}
                    />
                    <Route
                        path="/settings/employees/:storeId"
                        element={<StoreEmployeesPage />}
                    />
                    <Route path="/orders" element={<AdminOrdersPage />} />
                    <Route
                        path="/orders/assemble"
                        element={<AdminOrderAssemblePage />}
                    />
                    <Route
                        path="/orders/package"
                        element={<AdminOrderPackagePage />}
                    />
                    <Route
                        path="/orders/transfer"
                        element={<AdminOrderTransferPage />}
                    />
                    <Route
                        path="/orders/shipped"
                        element={<AdminOrderShippedPage />}
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
                        element={<div>Coming soon!</div>}
                    />
                    <Route
                        path="/orders/cancelled"
                        element={<AdminOrderCancelledPage />}
                    />
                    <Route
                        path="/orders/:orderId"
                        element={<AdminOrderPage />}
                    />
                </Route>
            </Route>
            <Route path="/login" element={<AdminLoginPage />} />
        </Routes>
    );
};
