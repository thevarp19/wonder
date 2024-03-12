import { FC } from "react";
import { SellerRegisterForm } from "../components/shared/SellerRegisterForm";

interface SellerRegisterPageProps {}

export const SellerRegisterPage: FC<SellerRegisterPageProps> = ({}) => {
    return (
        <div>
            <h1>Register</h1>
            <SellerRegisterForm />
        </div>
    );
};
