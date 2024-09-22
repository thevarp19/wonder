import { Protected } from "@/context/Protected";
import { ScanLayout } from "@/modules/scan/components/ScanLayout.tsx";
import { useAppSelector } from "@/redux/utils";
import { FC } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { EmployeeLayout } from "./EmployeeLayout";
import {
    EmployeeAcceptancePage,
    EmployeeArchiveOrdersPage,
    EmployeeAssembleProductPage,
    EmployeeCreateRefundReportPage,
    EmployeeCreateReportPage,
    EmployeeLoginPage,
    EmployeeOrderAssemblePage,
    EmployeeOrderCancelledPage,
    EmployeeOrderPackagePage,
    EmployeeOrderPackageProductPage,
    EmployeeOrderPage,
    EmployeeOrderShippedPage,
    EmployeeOrdersPage,
    EmployeeOrderTransferPage,
    EmployeePlacementPage,
    EmployeeProductSizesPage,
    EmployeeRefundsPage,
    EmployeeReportsPage,
    EmployeeSearchPage,
    EmployeeSuppliesPage,
    EmployeeUpdateRefundReportPage,
    EmployeeUpdateReportPage,
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
                        path="/orders/assemble/product"
                        element={<EmployeeAssembleProductPage />}
                    />
                    <Route
                        path="/orders/package"
                        element={<EmployeeOrderPackagePage />}
                    />
                    <Route
                        path="/orders/package/product"
                        element={<EmployeeOrderPackageProductPage />}
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
                    <Route path="/refunds" element={<EmployeeRefundsPage />} />
                    <Route path="/reports" element={<EmployeeReportsPage />} />
                    <Route
                        path="/reports/update-report/:reportId"
                        element={<EmployeeUpdateReportPage />}
                    />
                    <Route
                        path="/reports/create-report"
                        element={<EmployeeCreateReportPage />}
                    />
                    <Route
                        path="/reports/update-refund-report/:reportId"
                        element={<EmployeeUpdateRefundReportPage />}
                    />
                    <Route
                        path="/reports/create-refund-report"
                        element={<EmployeeCreateRefundReportPage />}
                    />
                </Route>
                <Route path="/scan" element={<ScanLayout />}>
                    <Route index element={<EmployeeAcceptancePage />} />
                </Route>
                <Route path="/placement" element={<ScanLayout />}>
                    <Route index element={<EmployeePlacementPage />} />
                </Route>
            </Route>
            <Route path="/login" element={<EmployeeLoginPage />} />
        </Routes>
    );
};
