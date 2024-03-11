import { Logo } from "@/components/shared/Logo";
import { FormikInput, FormikPasswordInput } from "@/components/ui/FormikInput";
import { cn } from "@/utils/shared.util";
import { SolutionOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Steps } from "antd";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";

interface RegisterPageProps {}

export const RegisterPage: FC<RegisterPageProps> = ({}) => {
    const { formik, mutation } = useRegister();
    const [current, setCurrent] = useState(0);

    const next = () => {
        if (
            formik.values.username == "" ||
            formik.values.firstName == "" ||
            formik.values.lastName == ""
        ) {
            formik.setFieldTouched("username");
            formik.setFieldTouched("firstName");
            formik.setFieldTouched("lastName");

            return;
        }
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };
    return (
        <main className="flex flex-col items-center justify-center h-screen gap-10 px-5">
            <Logo />
            <div className="w-full max-w-xs sm:max-w-sm">
                <Steps
                    responsive={false}
                    className="!mb-10"
                    current={1}
                    items={[
                        {
                            title: "Profile",
                            icon: <UserOutlined />,
                        },
                        {
                            title: "Account",
                            icon: <SolutionOutlined />,
                            status: current == 1 ? "process" : "wait",
                        },
                    ]}
                />
                <Form
                    onFinish={formik.submitForm}
                    className="flex flex-col items-center w-full gap-2 px-10"
                >
                    <div className={cn({ hidden: current == 1 }, "w-full")}>
                        <FormikInput
                            name="username"
                            formik={formik}
                            formItemProps={{ className: cn("w-full") }}
                            inputProps={{
                                placeholder: "Username",
                                size: "large",
                            }}
                        />
                        <FormikInput
                            name="firstName"
                            formik={formik}
                            formItemProps={{ className: cn("w-full") }}
                            inputProps={{
                                placeholder: "First name",
                                size: "large",
                            }}
                        />
                        <FormikInput
                            name="lastName"
                            formik={formik}
                            formItemProps={{ className: cn("w-full") }}
                            inputProps={{
                                placeholder: "Last name",
                                size: "large",
                            }}
                        />
                        <Form.Item className="w-full">
                            <Button
                                size={"large"}
                                onClick={next}
                                className={cn("w-full")}
                            >
                                Next step
                            </Button>
                        </Form.Item>
                    </div>
                    <div className={cn({ hidden: current == 0 }, "w-full")}>
                        <FormikInput
                            name="email"
                            formik={formik}
                            formItemProps={{ className: cn("w-full") }}
                            inputProps={{
                                placeholder: "Email",
                                size: "large",
                                type: "email",
                            }}
                        />
                        <FormikPasswordInput
                            name="password"
                            formik={formik}
                            formItemProps={{ className: cn("w-full") }}
                            inputProps={{
                                placeholder: "Password",
                                size: "large",
                                type: "password",
                            }}
                        />
                        <FormikPasswordInput
                            name="repeatPassword"
                            formik={formik}
                            formItemProps={{ className: cn("w-full") }}
                            inputProps={{
                                placeholder: "Repeat password",
                                size: "large",
                                type: "password",
                            }}
                        />
                        <Form.Item className="w-full">
                            <Button
                                htmlType="submit"
                                type="primary"
                                size={"large"}
                                loading={mutation.isPending}
                                className={cn("w-full")}
                            >
                                Register
                            </Button>
                        </Form.Item>
                        <Form.Item className="w-full">
                            <Button
                                size={"large"}
                                onClick={prev}
                                className={cn("w-full")}
                            >
                                Previous
                            </Button>
                        </Form.Item>
                    </div>

                    <Link
                        to={"/auth/login"}
                        className="!p-0 !text-primary w-full"
                    >
                        Already have an account? Log in here
                    </Link>
                </Form>
            </div>
        </main>
    );
};
