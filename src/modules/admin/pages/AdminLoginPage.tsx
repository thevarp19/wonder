import { LoginForm } from "@/components/form/LoginForm";
import { Logo } from "@/components/shared/Logo";
import { adminLoginSuccess } from "@/modules/admin/redux/auth/actions";
import { useAppDispatch } from "@/redux/utils";
import { LoginRequest } from "@/types/api";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface AdminLoginPageProps {}

export const AdminLoginPage: FC<AdminLoginPageProps> = ({}) => {
    const navigate = useNavigate();
    const navigateToHome = () => navigate("/admin");
    const dispatch = useAppDispatch();

    const success = (loginData: LoginRequest) => {
        dispatch(adminLoginSuccess(loginData.email));
    };
    return (
        <div className="flex flex-col items-center mt-[10vh]">
            <Logo />
            <h1 className="py-5 text-2xl font-semibold">Log in as an admin</h1>
            <LoginForm navigate={navigateToHome} success={success} />
        </div>
    );
};
