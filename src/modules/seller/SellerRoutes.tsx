import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { RegisterPage } from "../admin/pages/RegisterPage";

interface SellerRoutesProps {}

export const SellerRoutes: FC<SellerRoutesProps> = ({}) => {
    return (
        <Routes>
            <Route path="/" element={<RegisterPage />} />
        </Routes>
    );
};
