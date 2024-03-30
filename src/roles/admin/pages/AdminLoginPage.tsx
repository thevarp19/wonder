import { Logo } from "@/components/shared/Logo";
import { LoginForm } from "@/modules/auth/components/LoginForm";
import { useAppDispatch } from "@/redux/utils";
import { adminLoginSuccess } from "@/roles/admin/redux/auth/actions";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface AdminLoginPageProps {}

export const AdminLoginPage: FC<AdminLoginPageProps> = ({}) => {
    const navigate = useNavigate();
    const navigateToHome = () => navigate("/admin");
    const dispatch = useAppDispatch();

    const success = () => {
        dispatch(adminLoginSuccess());
        navigateToHome();
    };
    return (
        <div className="flex flex-col items-center mt-[10vh]">
            <Logo />
            <h1 className="py-5 text-2xl font-semibold">Log in as an admin</h1>
            <LoginForm success={success} />
        </div>
    );
};
