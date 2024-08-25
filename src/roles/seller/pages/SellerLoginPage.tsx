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
    const navigateToHome = () => navigate("/");
    const dispatch = useAppDispatch();
    const success = (data: LoginResponse) => {
        dispatch(sellerLoginSuccess(data));
        navigateToHome();
    };
    return (
        <div className="flex flex-col items-center h-screen bg-white sm:bg-[#F7F9FB]">
            <HeaderLogo />
            <div className="flex flex-col items-center justify-center w-full mt-10 md:flex-row md:mt-0">
                <div className="relative w-full">
                    <img
                        loading="lazy"
                        onLoadStart={() => setLoading(true)}
                        onLoad={() => setLoading(false)}
                        className="object-cover object-center md:block hidden w-full h-[100vh] rounded-br-[46px]"
                        src={loginSellerBanner}
                        alt="Banner"
                    />
                    {loading && (
                        <div className="absolute top-0 left-0 z-10 w-full h-full bg-gray-500 animate-pulse" />
                    )}
                </div>
                <div className="flex items-center justify-center w-full px-5 md:pt-[70px] pt-0">
                    <div className="flex flex-col md:items-start items-center md:min-w-[450px] min-w-[350px]">
                        <div className="w-full pb-5 text-center md:text-left">
                            <h1 className="text-2xl font-semibold lg:text-4xl sm:text-3xl">
                                Добро пожаловать!
                            </h1>
                            <h2 className="lg:text-2xl sm:text-xl text-lg text-[#6A6A6A]">
                                Повышайте продажи и успех станет ближе!
                            </h2>
                        </div>
                        <LoginForm success={success} />
                        <div className="mt-10 w-max">
                            <span className="">
                                Нет аккаунта?{" "}
                                <Link
                                    to="/register"
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
