import { Logo } from "@/components/shared/Logo";
import { SellerRegisterForm } from "@/modules/auth/components/SellerRegisterForm";
import { FC } from "react";
import { Link } from "react-router-dom";

interface SellerRegisterPageProps {}

export const SellerRegisterPage: FC<SellerRegisterPageProps> = ({}) => {
    return (
        <div className="flex flex-col items-center mt-[10vh]">
            <section className="flex flex-col items-center w-full max-w-sm">
                <Logo />
                <h1 className="py-5 text-2xl font-semibold">
                    Register as a seller
                </h1>
                <SellerRegisterForm />
                <Link to={"/seller/login"} className="w-full">
                    Already have an account? Log in here
                </Link>
            </section>
        </div>
    );
};
