import { LoginForm } from "@/components/form/LoginForm";
import { Logo } from "@/components/shared/Logo";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";

interface SellerLoginPageProps {}

export const SellerLoginPage: FC<SellerLoginPageProps> = ({}) => {
    const navigate = useNavigate();
    const navigateToHome = () => navigate("/seller");
    return (
        <div className="flex flex-col items-center mt-[10vh]">
            <section className="flex flex-col items-center w-full max-w-sm">
                <Logo />
                <h1 className="py-5 text-2xl font-semibold">
                    Log in as a seller
                </h1>
                <LoginForm navigate={navigateToHome} />
                <Link
                    to="/seller/register"
                    className="w-full mt-5 text-blue-500"
                >
                    Don't have an account? Register here
                </Link>
            </section>
        </div>
    );
};
