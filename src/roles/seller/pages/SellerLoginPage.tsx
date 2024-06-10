import { Logo } from "@/components/shared/Logo";
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
        <div className="flex flex-col items-center mt-[10vh]">
            <section className="flex flex-col items-center w-full max-w-sm">
                <Logo />
                <h1 className="py-5 text-2xl font-semibold">
                    Войти как продавец
                </h1>
                <LoginForm success={success} />
                <Link
                    to="/seller/register"
                    className="w-full mt-5 text-blue-500"
                >
                    Нет аккаунта? Зарегистрируйтесь здесь
                </Link>
            </section>
        </div>
    );
};
