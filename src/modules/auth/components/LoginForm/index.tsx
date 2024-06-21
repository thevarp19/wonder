import { FormikInput, FormikPasswordInput } from "@/components/ui/FormikInput";
import { cn } from "@/utils/shared.util";
import { Button, Checkbox, Form } from "antd";
import { FC } from "react";
import { useLogin } from "../../forms";
import { LoginResponse } from "../../types";

interface LoginFormProps {
    success: (data: LoginResponse) => void;
    role?: string;
}

export const LoginForm: FC<LoginFormProps> = ({ success, role }) => {
    const { formik, mutation } = useLogin(success);
    return (
        <Form
            onFinish={formik.submitForm}
            className="flex flex-col items-center w-full gap-2 px-10"
        >
            <div className="flex flex-col gap-[10px] text-[#4B4B4B] w-full">
                E-mail
                <FormikInput
                    name="email"
                    formik={formik}
                    formItemProps={{ className: cn("w-full") }}
                    inputProps={{
                        placeholder: "Электронная почта",
                        size: "large",
                    }}
                />
            </div>
            <div className="flex flex-col gap-[10px] text-[#4B4B4B] w-full">
                Пароль
                <div>
                    <FormikPasswordInput
                        name="password"
                        formik={formik}
                        formItemProps={{ className: cn("w-full") }}
                        inputProps={{
                            placeholder: "Пароль",
                            size: "large",
                        }}
                    />
                    {role !== "Admin" && (
                        <div className="flex justify-end">
                            <h2 className="cursor-pointer">Забыли пароль?</h2>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex w-full pb-3">
                <div>
                    <Checkbox className="text-[#4B4B4B]">Запомнить</Checkbox>
                </div>
            </div>
            <Button
                htmlType="submit"
                type="primary"
                size={"large"}
                className={"w-full"}
                loading={mutation.isPending}
            >
                Войти
            </Button>
        </Form>
    );
};
