import { HeaderLogo } from "@/components/shared/HeaderLogo";
import { LoginForm } from "@/modules/auth/components/LoginForm";
import { LoginResponse } from "@/modules/auth/types";
import { useAppDispatch } from "@/redux/utils";
import { adminLoginSuccess } from "@/roles/admin/redux/auth/actions";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface AdminLoginPageProps {}

export const AdminLoginPage: FC<AdminLoginPageProps> = ({}) => {
    const navigate = useNavigate();
    const navigateToHome = () => navigate("/admin");
    const dispatch = useAppDispatch();

    const success = (data: LoginResponse) => {
        dispatch(adminLoginSuccess(data));
        navigateToHome();
    };
    return (
        <div className="flex flex-col items-center h-screen bg-[#F7F9FB]">
            <HeaderLogo />
            <div className="flex w-full gap-10">
                <div className="w-full">
                    <img
                        loading="lazy"
                        className="object-cover object-center w-full h-[calc(100vh-70px)]"
                        src="/src/assets/img/loginAdminBanner.png"
                        alt="Banner"
                    />
                </div>
                <div className="flex items-center justify-center w-full">
                    <div className="flex flex-col min-w-[450px]">
                        <div className="pb-10">
                            <h1 className="text-4xl font-semibold">
                                Добро пожаловать!
                            </h1>
                        </div>
                        <LoginForm success={success} role="Admin" />
                    </div>
                </div>
            </div>
        </div>
    );
};
