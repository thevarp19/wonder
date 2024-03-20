import { useLogin } from "@/hooks/useLogin";
import { LoginRequest } from "@/types/api";
import { cn } from "@/utils/shared.util";
import { Button, Form } from "antd";
import { FC } from "react";
import { FormikInput, FormikPasswordInput } from "../ui/FormikInput";

interface LoginFormProps {
    navigate: () => void;
    success: (loginData: LoginRequest) => void;
}

export const LoginForm: FC<LoginFormProps> = ({ navigate, success }) => {
    const { formik, mutation } = useLogin(navigate, success);
    return (
        <Form
            onFinish={formik.submitForm}
            className="flex flex-col items-center w-full max-w-sm gap-2 px-10"
        >
            <FormikInput
                name="email"
                formik={formik}
                inputProps={{
                    placeholder: "Email",
                    size: "large",
                }}
            />
            <FormikPasswordInput
                name="password"
                formik={formik}
                inputProps={{
                    placeholder: "Password",
                    size: "large",
                }}
            />
            <Button
                htmlType="submit"
                type="primary"
                size={"large"}
                className={cn("w-full")}
                loading={mutation.isPending}
            >
                Log in
            </Button>
        </Form>
    );
};
