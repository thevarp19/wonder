import { Protected } from "@/context/Protected";
import { ScanLayout } from "@/modules/scan/components/ScanLayout.tsx";
import { useAppSelector } from "@/redux/utils";
import { FC } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { EmployeeLayout } from "./EmployeeLayout";
import {
    EmployeeArchiveOrdersPage,
    EmployeeCreateReportPage,
    EmployeeLoginPage,
    EmployeeOrderAssemblePage,
    EmployeeOrderCancelledPage,
    EmployeeOrderPackageDetailPage,
    EmployeeOrderPackagePage,
    EmployeeOrderPage,
    EmployeeOrderShippedPage,
    EmployeeOrdersPage,
    EmployeeOrderTransferPage,
    EmployeeProductSizesPage,
    EmployeeReportsPage,
    EmployeeSearchPage,
    EmployeeSuppliesPage,
    EmployeeUpdateReportPage,
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
                        element={<div className="">Сотрудник</div>}
                    />
                    <Route
                        path="/supplies"
                        element={<EmployeeSuppliesPage />}
                    />
                    <Route
                        path="/supplies/:supplyId"
                        element={<SupplyDetailsPage />}
                    />
                    <Route path="/orders" element={<EmployeeOrdersPage />} />
                    <Route
                        path="/orders/assemble"
                        element={<EmployeeOrderAssemblePage />}
                    />
                    <Route
                        path="/orders/package"
                        element={<EmployeeOrderPackagePage />}
                    />
                    <Route
                        path="/orders/package/:orderId"
                        element={<EmployeeOrderPackageDetailPage />}
                    />
                    <Route
                        path="/orders/transfer"
                        element={<EmployeeOrderTransferPage />}
                    />
                    <Route
                        path="/orders/shipped"
                        element={<EmployeeOrderShippedPage />}
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
                        element={<EmployeeArchiveOrdersPage />}
                    />
                    <Route
                        path="/orders/cancelled"
                        element={<EmployeeOrderCancelledPage />}
                    />
                    <Route
                        path="/orders/:orderId"
                        element={<EmployeeOrderPage />}
                    />
                    <Route path="/search" element={<EmployeeSearchPage />} />
                    <Route
                        path="/sizes"
                        element={<EmployeeProductSizesPage />}
                    />
                    <Route path="/reports" element={<EmployeeReportsPage />} />
                    <Route
                        path="/reports/update-report/:reportId"
                        element={<EmployeeUpdateReportPage />}
                    />
                    <Route
                        path="/reports/create-report"
                        element={<EmployeeCreateReportPage />}
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
