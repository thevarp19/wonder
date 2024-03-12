import { LoginForm } from "@/components/shared/LoginForm";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface SellerLoginPageProps {}

export const SellerLoginPage: FC<SellerLoginPageProps> = ({}) => {
    const navigate = useNavigate();
    const navigateToHome = () => navigate("/seller");
    return (
        <div className="flex flex-col items-center mt-[10vh]">
            <h1 className="py-5 text-2xl font-semibold">Log in as seller</h1>
            <LoginForm navigate={navigateToHome} />
        </div>
    );
};
