import { Protected } from "@/context/Protected";
import { FC } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { AdminLoginPage } from "./pages";

interface AdminRoutesProps {}

export const AdminRoutes: FC<AdminRoutesProps> = ({}) => {
    const navigate = useNavigate();
    const navigateToAdminLogin = () => {
        navigate("/admin/login", { replace: true });
    };
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Protected
                        checkAction={async () => {
                            await new Promise((resolve) =>
                                setTimeout(resolve, 1000)
                            );
                            return false;
                        }}
                        navigate={navigateToAdminLogin}
                    />
                }
            >
                <Route
                    index
                    path="/"
                    element={
                        <div className="w-screen h-screen bg-black">Admin</div>
                    }
                />
            </Route>
            <Route path="/login" element={<AdminLoginPage />} />
        </Routes>
    );
};
