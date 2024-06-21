import { HeaderLogo } from "@/components/shared/HeaderLogo";
import { LoginForm } from "@/modules/auth/components/LoginForm";
import { LoginResponse } from "@/modules/auth/types";
import { useAppDispatch } from "@/redux/utils";
import { sellerLoginSuccess } from "@/roles/seller/redux/auth/actions";

import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

interface SellerLoginPageProps {}

export const SellerLoginPage: FC<SellerLoginPageProps> = () => {
    const navigate = useNavigate();
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
                <div className="w-full">
                    <img
                        loading="lazy"
                        className="object-cover object-center w-full h-[calc(100vh-70px)]"
                        src="/src/assets/img/loginBanner.png"
                        alt="Banner"
                    />
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
