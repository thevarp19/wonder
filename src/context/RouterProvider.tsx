import { AdminRoutes } from "@/roles/admin/AdminRoutes";
import { EmployeeRoutes } from "@/roles/employee/EmployeeRoutes";
import { SellerRoutes } from "@/roles/seller/SellerRoutes";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";

interface RouterProviderProps {}

export const RouterProvider: FC<RouterProviderProps> = ({}) => {
    return (
        <Routes>
            <Route path="/*" element={<SellerRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            {/* <Route path="/seller/*" element={} /> */}
            <Route path="/employee/*" element={<EmployeeRoutes />} />
        </Routes>
    );
};
