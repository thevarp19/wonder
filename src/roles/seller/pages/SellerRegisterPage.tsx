import { HeaderLogo } from "@/components/shared/HeaderLogo";
import { SellerRegisterForm } from "@/modules/auth/components/SellerRegisterForm";
import { FC } from "react";
import { Link } from "react-router-dom";

interface SellerRegisterPageProps {}

export const SellerRegisterPage: FC<SellerRegisterPageProps> = ({}) => {
    return (
        <div className="flex flex-col items-center h-screen bg-[#F7F9FB]">
            <HeaderLogo />
            <div className="flex justify-center w-full h-full">
                <section className="flex flex-col items-center w-full max-w-sm">
                    <h1 className="py-5 text-2xl font-semibold">
                        Добро пожаловать!
                    </h1>
                    <SellerRegisterForm />
                    <div className="flex justify-center">
                        <span>
                            Уже есть аккаунт?{" "}
                            <Link
                                to={"/seller/login"}
                                className="w-full visited:text-[#EF7214]"
                            >
                                Вход
                            </Link>
                        </span>
                    </div>
                </section>
            </div>
        </div>
    );
};
