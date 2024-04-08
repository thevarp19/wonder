import { Logo } from "@/components/shared/Logo";
import { LoginForm } from "@/modules/auth/components/LoginForm";
import { LoginResponse } from "@/modules/auth/types";
import { useAppDispatch } from "@/redux/utils";
import { employeeLoginSuccess } from "@/roles/employee/redux/auth/actions";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface EmployeeLoginPageProps {}

export const EmployeeLoginPage: FC<EmployeeLoginPageProps> = ({}) => {
    const navigate = useNavigate();
    const navigateToHome = () => navigate("/employee");
    const dispatch = useAppDispatch();

    const success = (data: LoginResponse) => {
        dispatch(employeeLoginSuccess(data));
        navigateToHome();
    };
    return (
        <div className="flex flex-col items-center mt-[10vh]">
            <Logo />
            <h1 className="py-5 text-2xl font-semibold">
                Log in as an employee
            </h1>
            <LoginForm success={success} />
        </div>
    );
};
