import { Protected } from "@/context/Protected";
import { ScanLayout } from "@/modules/scan/components/ScanLayout.tsx";
import { useAppSelector } from "@/redux/utils";
import { FC } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { EmployeeLayout } from "./EmployeeLayout";
import {
    EmployeeLoginPage,
    EmployeeSuppliesPage,
    ScanPage,
    SupplyDetailsPage,
} from "./pages";

interface EmployeeRoutesProps {}

export const EmployeeRoutes: FC<EmployeeRoutesProps> = ({}) => {
    const navigate = useNavigate();
    const navigateToEmployeeLogin = () => {
        navigate("/employee/login", { replace: true });
    };

    const employeeAuth = useAppSelector((state) => state.employee.auth);

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Protected
                        checkAction={async () => {
                            return employeeAuth.isLoggedIn;
                        }}
                        navigate={navigateToEmployeeLogin}
                    />
                }
            >
                <Route path="/" element={<EmployeeLayout />}>
                    <Route
                        index
                        path="/"
                        element={<div className="">Employee</div>}
                    />
                    <Route
                        path="/supplies"
                        element={<EmployeeSuppliesPage />}
                    />
                    <Route
                        path="/supplies/:supplyId"
                        element={<SupplyDetailsPage />}
                    />
                </Route>
                <Route path="/scan" element={<ScanLayout />}>
                    <Route index element={<ScanPage />} />
                </Route>
            </Route>
            <Route path="/login" element={<EmployeeLoginPage />} />
        </Routes>
    );
};
