import { FormikInput } from "@/components/ui/FormikInput";
import { Loading } from "@/components/ui/Loading";
import { cn } from "@/utils/shared.util";
import { CopyOutlined } from "@ant-design/icons";
import { App, Button, Form, Input } from "antd";
import { FC } from "react";
import { Link, useParams } from "react-router-dom";
import { useActivateStoreSeller } from "../../forms";
import { useGetDetailedSellerOwnStores } from "../../queries";

export const StoreActivationForm: FC = () => {
    const { storeId: storeIdRaw } = useParams();
    const { message } = App.useApp();
    const wonderId = parseInt(storeIdRaw || "");
    const { data: store, isPending } = useGetDetailedSellerOwnStores(wonderId);
    const { formik, mutation } = useActivateStoreSeller(wonderId);
    if (isPending) {
        return <Loading />;
    }
    const onCopy = async (data: string) => {
        try {
            await navigator.clipboard.writeText(data);
            message.success("Скопирована в буфер обмена!");
        } catch (err) {
            message.error("Не удалось скопировать.");
        }
    };
    return (
        <div className="flex flex-col items-center w-full h-full">
            <div className="flex flex-col gap-10 items-center md:border border-[#D9D9D9] rounded-[28px] md:px-[126px] px-4 md:py-[34px] pb-[68px] w-full md:w-auto">
                <h2 className="text-[18px] font-semibold">
                    Активация Склада Wonder
                </h2>

                <Form
                    onFinish={formik.submitForm}
                    layout="vertical"
                    className="flex flex-col w-full md:max-w-[300px] gap-2"
                >
                    <h2 className="w-full pb-4 text-sm">
                        Добавьте Склад Wonder в кабинете продавца Kaspi
                        скопировав данные
                    </h2>
                    <FormikInput
                        name="kaspi_warehouse_id"
                        formik={formik}
                        formItemProps={{
                            label: "Kaspi ID (Идентификатор Kaspi)",
                        }}
                        inputProps={{
                            size: "large",
                        }}
                    />
                    <div className="flex flex-col gap-2 mb-4">
                        <h2 className="text-sm">Город</h2>
                        <Input
                            value={store?.city}
                            disabled
                            suffix={
                                <CopyOutlined
                                    onClick={() => {
                                        onCopy(String(store?.city));
                                    }}
                                />
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <h2 className="text-sm">Название улицы</h2>
                        <Input
                            value={store?.street_name}
                            disabled
                            suffix={
                                <CopyOutlined
                                    onClick={() => {
                                        onCopy(String(store?.street_name));
                                    }}
                                />
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <h2 className="text-sm">Номер улицы</h2>
                        <Input
                            value={store?.street_number}
                            disabled
                            suffix={
                                <CopyOutlined
                                    onClick={() => {
                                        onCopy(String(store?.street_number));
                                    }}
                                />
                            }
                        />
                    </div>
                    <div className="flex flex-col gap-2 mb-4">
                        <h2 className="text-sm">Дополнительная информация</h2>
                        <Input
                            value={store?.additional_information}
                            disabled
                            suffix={
                                <CopyOutlined
                                    onClick={() => {
                                        onCopy(
                                            String(
                                                store?.additional_information
                                            )
                                        );
                                    }}
                                />
                            }
                        />
                    </div>

                    <div className="flex flex-col gap-2 mb-4">
                        <h2 className="text-sm">Склад</h2>
                        <Input
                            value={store?.is_warehouse ? "Да" : "Нет"}
                            disabled
                        />
                    </div>
                    <div className="flex gap-2 pt-5">
                        <Link to="/settings" className="w-full cursor-pointer">
                            <Button
                                // htmlType="submit"
                                // type="primary"
                                size={"large"}
                                className={cn("w-full !rounded-md")}
                                // loading={mutation.isPending}
                            >
                                Отмена
                            </Button>
                        </Link>
                        <Button
                            htmlType="submit"
                            type="primary"
                            size={"large"}
                            disabled={formik.values.kaspi_warehouse_id === ""}
                            className={cn("w-full !rounded-md")}
                            loading={mutation.isPending}
                        >
                            Сохранить
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};
