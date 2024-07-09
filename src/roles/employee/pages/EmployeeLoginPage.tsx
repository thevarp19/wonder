import { HeaderLogo } from "@/components/shared/HeaderLogo";
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
        <div className="flex flex-col items-center h-screen bg-[#F7F9FB]">
            <HeaderLogo />
            <div className="flex items-center justify-center w-full md:h-full gap-10 md:pt-0 pt-5">
                <div className="flex flex-col sm:min-w-[450px] min-w-[350px]">
                    <h1 className="lg:text-4xl sm:text-3xl text-2xl md:text-left text-center py-5 font-semibold">
                        Войти как сотрудник
                    </h1>
                    <div className="w-full max-w-md">
                        <LoginForm success={success} />
                    </div>
                </div>
            </div>
        </div>
    );
};
