import { LoginForm } from "@/components/shared/LoginForm";
import { Logo } from "@/components/shared/Logo";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface AdminLoginPageProps {}

export const AdminLoginPage: FC<AdminLoginPageProps> = ({}) => {
    const navigate = useNavigate();
    const navigateToHome = () => navigate("/admin");
    return (
        <div className="flex flex-col items-center mt-[10vh]">
            <Logo />
            <h1 className="py-5 text-2xl font-semibold">Log in as an admin</h1>
            <LoginForm navigate={navigateToHome} />
        </div>
    );
};
