import { loginAdminBanner } from "@/assets";
import { HeaderLogo } from "@/components/shared/HeaderLogo";
import { LoginForm } from "@/modules/auth/components/LoginForm";
import { LoginResponse } from "@/modules/auth/types";
import { useAppDispatch } from "@/redux/utils";
import { adminLoginSuccess } from "@/roles/admin/redux/auth/actions";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AdminLoginPageProps {}

export const AdminLoginPage: FC<AdminLoginPageProps> = ({}) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
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
                <div className="relative w-full">
                    <img
                        loading="lazy"
                        onLoadStart={() => setLoading(true)}
                        onLoad={() => setLoading(false)}
                        className="object-cover object-center w-full h-[calc(100vh-70px)]"
                        src={loginAdminBanner}
                        alt="Banner"
                    />
                    {loading && (
                        <div className="absolute top-0 left-0 z-10 w-full h-full bg-gray-500 animate-pulse" />
                    )}
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
