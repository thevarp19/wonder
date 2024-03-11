import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { RegisterPage } from "./pages/RegisterPage";

interface AdminRoutesProps {}

export const AdminRoutes: FC<AdminRoutesProps> = ({}) => {
    return (
        <Routes>
            <Route path="/" element={<RegisterPage />} />
            <Route path="/register" element={<RegisterPage />} />
        </Routes>
    );
};
