import { FormikInput, FormikPasswordInput } from "@/components/ui/FormikInput";
import { Button, Form } from "antd";
import { FC } from "react";
import { useLogin } from "../../forms";
import { LoginResponse } from "../../types";
interface LoginFormProps {
    success: (data: LoginResponse) => void;
}

export const LoginForm: FC<LoginFormProps> = ({ success }) => {
    const { formik, mutation } = useLogin(success);
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
                className={"w-full"}
                loading={mutation.isPending}
            >
                Log in
            </Button>
        </Form>
    );
};
