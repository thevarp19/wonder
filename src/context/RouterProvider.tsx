import { MainPage } from "@/MainPage";
import { AdminRoutes } from "@/modules/admin/AdminRoutes";
import { SellerRoutes } from "@/modules/seller/SellerRoutes";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";

interface RouterProviderProps {}

export const RouterProvider: FC<RouterProviderProps> = ({}) => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/seller/*" element={<SellerRoutes />} />
        </Routes>
    );
};
