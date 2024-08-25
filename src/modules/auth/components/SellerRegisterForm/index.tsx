import { FormikInput, FormikPasswordInput } from "@/components/ui/FormikInput";
import { phoneNumberChangeHandler } from "@/utils/form.util";
import { cn } from "@/utils/shared.util";
import {
    IdcardOutlined,
    ShopOutlined,
    SolutionOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Button, Checkbox, ConfigProvider, Form, Steps } from "antd";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useSellerRegister } from "../../forms";

interface SellerRegisterFormProps {}

export const SellerRegisterForm: FC<SellerRegisterFormProps> = ({}) => {
    const { formik, mutation } = useSellerRegister();
    const [current, setCurrent] = useState(1);
    const [agreement, setAgreement] = useState(false);

    const toggleChecked = () => {
        setAgreement(!agreement);
    };
    const next = () => {
        if (
            (formik.values.phone_number == "" ||
                formik.values.first_name == "" ||
                formik.values.last_name == "") &&
            current == 1
        ) {
            formik.setFieldTouched("phone_number");
            formik.setFieldTouched("first_name");
            formik.setFieldTouched("last_name");
            return;
        }
        if (
            (formik.values.kaspi_store_name == "" ||
                formik.values.kaspi_seller_id == "" ||
                formik.values.kaspi_token == "") &&
            current == 2
        ) {
            formik.setFieldTouched("kaspi_store_name");
            formik.setFieldTouched("kaspi_seller_id");
            formik.setFieldTouched("kaspi_token");
            return;
        }
        if (
            (formik.values.merchant_email == "" ||
                formik.values.merchant_password == "") &&
            current == 3
        ) {
            formik.setFieldTouched("merchant_email");
            formik.setFieldTouched("merchant_password");
            return;
        }
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };
    return (
        <div className="w-full max-w-xs sm:max-w-md">
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
                    responsive={true}
                    className="sm:!mb-10"
                    current={1}
                    items={[
                        {
                            title: "Профиль",
                            icon: <UserOutlined />,
                            status: current >= 1 ? "process" : "wait",
                        },
                        {
                            title: "Магазин",
                            icon: <ShopOutlined />,
                            status: current >= 2 ? "process" : "wait",
                        },
                        {
                            title: "Доступ",
                            icon: <IdcardOutlined />,
                            status: current >= 3 ? "process" : "wait",
                        },
                        {
                            title: "Аккаунт",
                            icon: <SolutionOutlined />,
                            status: current == 4 ? "process" : "wait",
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
                            name="first_name"
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
                            name="last_name"
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
                            name="phone_number"
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
                            name="kaspi_store_name"
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
                            name="kaspi_seller_id"
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
                            name="kaspi_token"
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
                    className={cn("hidden", { block: current == 3 }, "w-full")}
                >
                    <div className="flex flex-col gap-2 mb-3">
                        <h2 className="text-lg font-medium">
                            Автоматическая интеграция данных
                        </h2>
                        <h3 className="text-sm text-[#696969] max-w-md">
                            Автоматическая выгрузка данных с Кабинета продавца
                            через предоставления доступа к Менеджер аккаунту
                            Kaspi
                        </h3>
                        <h2 className="font-bold ">
                            Данные Менеджер аккаунта Kaspi:
                        </h2>
                    </div>
                    <div className="flex flex-col gap-[10px] text-[#4B4B4B]">
                        Почта
                        <FormikInput
                            name="merchant_email"
                            formik={formik}
                            formItemProps={{ className: cn("w-full") }}
                            inputProps={{
                                placeholder: "Почта ",
                                size: "large",
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-[10px] text-[#4B4B4B]">
                        Пароль
                        <FormikInput
                            name="merchant_password"
                            formik={formik}
                            formItemProps={{ className: cn("w-full") }}
                            inputProps={{
                                placeholder: "Пароль",
                                size: "large",
                            }}
                        />
                    </div>
                    <Link
                        target="_blank"
                        to={"/auto-upload-instruction"}
                        style={{ color: "inherit", textDecoration: "inherit" }}
                    >
                        <h2 className="text-sm font-medium underline text-[#EF7214]">
                            Как создать менеджер аккаунт?
                        </h2>
                    </Link>

                    <Form.Item className="w-full !mb-4 !mt-8">
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
                            className={cn("w-full")}
                        >
                            Назад
                        </Button>
                    </Form.Item>
                </div>
                <div
                    className={cn("hidden", { block: current == 4 }, "w-full ")}
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
                            name="repeat_password"
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
                            <Checkbox
                                value={agreement}
                                onChange={toggleChecked}
                            />
                        </div>
                        <div>
                            <h2 className="text-xs">
                                Создавая учетную запись, вы соглашаетесь с
                                нашими{" "}
                                <Link
                                    target="_blank"
                                    style={{
                                        color: "inherit",
                                        textDecoration: "inherit",
                                    }}
                                    to={
                                        "https://storage.googleapis.com/wonder-v2/%D0%A3%D1%81%D0%BB%D0%BE%D0%B2%D0%B8%D1%8F_%D0%BE%D0%B1%D1%81%D0%BB%D1%83%D0%B6%D0%B8%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F_%D0%B8_%D0%BF%D0%BE%D0%BB%D0%B8%D1%82%D0%B8%D0%BA%D0%B0_%D0%BA%D0%BE%D0%BD%D1%84%D0%B8%D0%B4%D0%B5%D0%BD%D1%86%D0%B8%D0%B0%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D0%B8_%D0%BA%D0%BE%D0%BC%D0%BF%D0%B0%D0%BD%D0%B8%D0%B9_Wonder.pdf"
                                    }
                                    className="!underline"
                                >
                                    Условиями обслуживания и Политикой
                                    конфиденциальности.
                                </Link>
                            </h2>
                        </div>
                    </div>
                    <Form.Item className="w-full !mb-4">
                        <Button
                            htmlType="submit"
                            type="primary"
                            size={"large"}
                            disabled={!agreement}
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
