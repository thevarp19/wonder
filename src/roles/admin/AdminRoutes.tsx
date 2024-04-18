import { Protected } from "@/context/Protected";
import { useAppSelector } from "@/redux/utils";
import { FC } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AdminLayout } from "./AdminLayout";
import {
    AdminLoginPage,
    AdminSettingsPage,
    CreateBoxPage,
    CreateStorePage,
    StoreCellsPage,
    UpdateStorePage,
} from "./pages";

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
                    <Route
                        index
                        path="/"
                        element={<div className="">Admin</div>}
                    />
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
                </Route>
            </Route>
            <Route path="/login" element={<AdminLoginPage />} />
        </Routes>
    );
};
