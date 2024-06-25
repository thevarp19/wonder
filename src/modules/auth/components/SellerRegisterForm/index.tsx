import { FormikInput, FormikPasswordInput } from "@/components/ui/FormikInput";
import { phoneNumberChangeHandler } from "@/utils/form.util";
import { cn } from "@/utils/shared.util";
import {
    ShopOutlined,
    SolutionOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, ConfigProvider, Form, Steps } from "antd";
import { FC, useState } from "react";
import { useSellerRegister } from "../../forms";

interface SellerRegisterFormProps {}

export const SellerRegisterForm: FC<SellerRegisterFormProps> = ({}) => {
    const { formik, mutation } = useSellerRegister();
    const [current, setCurrent] = useState(1);

    const next = () => {
        if (
            (formik.values.phoneNumber == "" ||
                formik.values.firstName == "" ||
                formik.values.lastName == "") &&
            current == 1
        ) {
            formik.setFieldTouched("phoneNumber");
            formik.setFieldTouched("firstName");
            formik.setFieldTouched("lastName");
            return;
        }
        if (
            (formik.values.sellerName == "" ||
                formik.values.sellerId == "" ||
                formik.values.tokenKaspi == "") &&
            current == 2
        ) {
            formik.setFieldTouched("sellerName");
            formik.setFieldTouched("sellerId");
            formik.setFieldTouched("tokenKaspi");
            return;
        }
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };
    return (
        <div className="w-full max-w-xs sm:max-w-sm">
            <ConfigProvider
                theme={{
                    components: {
                        Steps: {
                            colorSplit: "#F7F9FB",
                        },
                    },
                }}
            >
                <Steps
                    responsive={false}
                    className="!mb-10"
                    current={1}
                    items={[
                        {
                            title: "Профиль",
                            icon: <UserOutlined />,
                            status: current >= 1 ? "process" : "wait",
                        },
                        {
                            title: "Склад",
                            icon: <ShopOutlined />,
                            status: current >= 2 ? "process" : "wait",
                        },
                        {
                            title: "Аккаунт",
                            icon: <SolutionOutlined />,
                            status: current == 3 ? "process" : "wait",
                        },
                    ]}
                />
            </ConfigProvider>
            <Form
                onFinish={formik.submitForm}
                className="flex flex-col items-center w-full gap-2 px-10"
            >
                <div
                    className={cn("hidden", { block: current == 1 }, "w-full")}
                >
                    <div className="flex flex-col gap-[10px] text-[#4B4B4B]">
                        Имя
                        <FormikInput
                            name="firstName"
                            formik={formik}
                            formItemProps={{ className: cn("w-full") }}
                            inputProps={{
                                placeholder: "Имя",
                                size: "large",
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-[10px] text-[#4B4B4B]">
                        Фамилия
                        <FormikInput
                            name="lastName"
                            formik={formik}
                            formItemProps={{ className: cn("w-full") }}
                            inputProps={{
                                placeholder: "Фамилия",
                                size: "large",
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-[10px] text-[#4B4B4B]">
                        Номер телефона
                        <FormikInput
                            name="phoneNumber"
                            formik={formik}
                            formItemProps={{ className: cn("w-full") }}
                            inputProps={{
                                placeholder: "Номер телефона",
                                size: "large",
                                onChange: (e) => {
                                    phoneNumberChangeHandler(
                                        e,
                                        formik.handleChange
                                    );
                                },
                            }}
                        />
                    </div>
                    <Form.Item className="w-full !mb-4">
                        <Button
                            type="primary"
                            size={"large"}
                            onClick={next}
                            className={cn("w-full")}
                        >
                            Следующий шаг
                        </Button>
                    </Form.Item>
                </div>
                <div
                    className={cn("hidden", { block: current == 2 }, "w-full")}
                >
                    <div className="flex flex-col gap-[10px] text-[#4B4B4B]">
                        Название магазина Kaspi
                        <FormikInput
                            name="sellerName"
                            formik={formik}
                            formItemProps={{ className: cn("w-full") }}
                            inputProps={{
                                placeholder: "Название магазина Kaspi",
                                size: "large",
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-[10px] text-[#4B4B4B]">
                        ID продавца
                        <FormikInput
                            name="sellerId"
                            formik={formik}
                            formItemProps={{ className: cn("w-full") }}
                            inputProps={{
                                placeholder: "ID продавца",
                                size: "large",
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-[10px] text-[#4B4B4B]">
                        Токен Kaspi API
                        <FormikInput
                            name="tokenKaspi"
                            formik={formik}
                            formItemProps={{ className: cn("w-full") }}
                            inputProps={{
                                placeholder: "Токен Kaspi API",
                                size: "large",
                            }}
                        />
                    </div>
                    <Form.Item className="w-full !mb-4">
                        <Button
                            size={"large"}
                            onClick={next}
                            type="primary"
                            className={cn("w-full")}
                        >
                            Следующий шаг
                        </Button>
                    </Form.Item>
                    <Form.Item className="w-full !mb-4">
                        <Button
                            size={"large"}
                            onClick={prev}
                            className={cn(
                                "w-full"
                                // !border-[#EF7214] !text-[#EF7214]"
                            )}
                        >
                            Назад
                        </Button>
                    </Form.Item>
                </div>
                <div
                    className={cn("hidden", { block: current == 3 }, "w-full ")}
                >
                    <div className="flex flex-col gap-[10px] text-[#4B4B4B]">
                        E-mail
                        <FormikInput
                            name="email"
                            formik={formik}
                            formItemProps={{ className: cn("w-full") }}
                            inputProps={{
                                placeholder: "Email",
                                size: "large",
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-[10px] text-[#4B4B4B]">
                        Пароль
                        <FormikPasswordInput
                            name="password"
                            formik={formik}
                            formItemProps={{ className: cn("w-full") }}
                            inputProps={{
                                placeholder: "Пароль",
                                size: "large",
                                type: "password",
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-[10px] text-[#4B4B4B]">
                        Повторите пароль
                        <FormikPasswordInput
                            name="repeatPassword"
                            formik={formik}
                            formItemProps={{ className: cn("w-full") }}
                            inputProps={{
                                placeholder: "Повторите пароль",
                                size: "large",
                                type: "password",
                            }}
                        />
                    </div>
                    <div className="flex gap-[15px] pb-8">
                        <div className="flex flex-col items-start">
                            <Checkbox />
                        </div>
                        <h2 className="text-xs">
                            Создавая учетную запись, вы соглашаетесь с нашими{" "}
                            <span className="underline">
                                Условиями обслуживания и Политикой
                                конфиденциальности.
                            </span>
                        </h2>
                    </div>
                    <Form.Item className="w-full !mb-4">
                        <Button
                            htmlType="submit"
                            type="primary"
                            size={"large"}
                            loading={mutation.isPending}
                            className={cn("w-full")}
                        >
                            Зарегистрироваться
                        </Button>
                    </Form.Item>
                    <Form.Item className="w-full !mb-4">
                        <Button
                            size={"large"}
                            onClick={prev}
                            className={cn("w-full")}
                        >
                            Назад
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
    );
};
