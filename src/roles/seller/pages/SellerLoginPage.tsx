import { loginSellerBanner } from "@/assets";
import { HeaderLogo } from "@/components/shared/HeaderLogo";
import { LoginForm } from "@/modules/auth/components/LoginForm";
import { LoginResponse } from "@/modules/auth/types";
import { useAppDispatch } from "@/redux/utils";
import { sellerLoginSuccess } from "@/roles/seller/redux/auth/actions";

import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface SellerLoginPageProps {}

export const SellerLoginPage: FC<SellerLoginPageProps> = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const navigateToHome = () => navigate("/seller");
    const dispatch = useAppDispatch();
    const success = (data: LoginResponse) => {
        dispatch(sellerLoginSuccess(data));
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
                        src={loginSellerBanner}
                        alt="Banner"
                    />
                    {loading && (
                        <div className="absolute top-0 left-0 z-10 w-full h-full bg-gray-500 animate-pulse" />
                    )}
                </div>
                <div className="flex items-center justify-center w-full">
                    <div className="flex flex-col min-w-[450px]">
                        <div className="pb-5">
                            <h1 className="text-4xl font-semibold">
                                Добро пожаловать!
                            </h1>
                            <h2 className="text-2xl text-[#6A6A6A]">
                                Повышайте продажи и успех станет ближе!
                            </h2>
                        </div>
                        <LoginForm success={success} />
                        <div className="flex justify-start mt-5 w-max">
                            <span>
                                Нет аккаунта?{" "}
                                <Link
                                    to="/seller/register"
                                    className="w-full visited:text-[#EF7214]"
                                >
                                    Регистрация
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
