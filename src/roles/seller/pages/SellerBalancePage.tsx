import { FormikInput } from "@/components/ui/FormikInput";
import { BalanceHistoryReplenishmentTable } from "@/modules/balance/components/BalanceHistoryReplenishmentTable";
import { BalanceHistoryStatementTable } from "@/modules/balance/components/BalanceHistoryStatementTable";
import { useAddReplenishment } from "@/modules/balance/forms";
import {
    useGetSellerBalanceStatement,
    useGetSellerReplenishment,
} from "@/modules/balance/queries";
import { useGetSellerProfile } from "@/modules/seller/queries";
import { phoneNumberChangeHandler } from "@/utils/form.util";
import { cn } from "@/utils/shared.util";
import { Button, ConfigProvider, Form, Menu, Modal, Popconfirm } from "antd";
import { MenuProps } from "antd/lib";
import { FC, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const SellerBalancePage: FC = () => {
    const items: MenuProps["items"] = [
        {
            label: "История пополнений",
            key: "replenishment",
        },
        {
            label: "История списаний",
            key: "statement",
        },
    ];
    const [searchParams, setSearchParams] = useSearchParams();
    const [current, setCurrent] = useState(
        searchParams.get("menu_x") || "replenishment"
    );
    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key);
        setSearchParams({ menu_x: e.key });
    };
    const [page, setPage] = useState(0);
    const { data: orders, isPending: orderPending } = useGetSellerReplenishment(
        page,
        10
    );
    const { data: statements, isPending: statementPending } =
        useGetSellerBalanceStatement(page, 10);
    const { data, isPending: balancePending } = useGetSellerProfile();
    return (
        <div className="h-full">
            <div className="flex flex-col gap-5">
                <div className="flex items-center gap-10">
                    <h2 className="text-2xl font-semibold ">Баланс</h2>
                </div>
                <div className="text-lg">
                    <h2>{`Доступно: ${
                        balancePending ? 0 : data?.balance
                    } ₸`}</h2>
                </div>
                <div className="flex justify-end w-full">
                    <AddReplenishmentModal />
                </div>
                <ConfigProvider
                    theme={{
                        components: {
                            Menu: {
                                itemBg: "#F7F9FB",
                                colorSplit: "#F7F9FB",
                                borderRadius: 8,
                            },
                        },
                    }}
                >
                    <Menu
                        items={items}
                        mode="horizontal"
                        onClick={onClick}
                        className="rounded-t-lg"
                        selectedKeys={[
                            ["replenishment", "statement"].includes(current)
                                ? current
                                : "replenishment",
                        ]}
                    />
                </ConfigProvider>
                <div className="overflow-x-auto w-full md:mb-0 mb-[70px]">
                    {current === "replenishment" && (
                        <BalanceHistoryReplenishmentTable
                            data={orders}
                            isPending={orderPending}
                            setPage={setPage}
                            page={page}
                        />
                    )}
                    {current === "statement" && (
                        <BalanceHistoryStatementTable
                            data={statements}
                            isPending={statementPending}
                            setPage={setPage}
                            page={page}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export const AddReplenishmentModal: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { formik, mutation } = useAddReplenishment();
    return (
        <div>
            <Button
                size="large"
                className="!rounded-md"
                type="primary"
                onClick={() => {
                    setIsModalOpen(true);
                }}
            >
                Пополнить баланс
            </Button>
            <Modal
                open={isModalOpen}
                onCancel={() => {
                    setIsModalOpen(false);
                }}
                cancelButtonProps={{ style: { width: "100%" } }}
                cancelText="Назад"
                okButtonProps={{ style: { display: "none" } }}
                onOk={() => {
                    setIsModalOpen(false);
                }}
            >
                <Form
                    onFinish={formik.submitForm}
                    layout="vertical"
                    className="flex flex-col w-full max-w-xl gap-2 px-10"
                >
                    <FormikInput
                        name="iban"
                        formik={formik}
                        formItemProps={{
                            label: "Номер телефона",
                            required: true,
                            className: cn("w-full"),
                        }}
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

                    <FormikInput
                        name="amount"
                        formik={formik}
                        formItemProps={{
                            label: "Сумма",
                            required: true,
                        }}
                        inputProps={{
                            size: "large",
                            style: { width: "100%" },
                            suffix: "₸",
                        }}
                    />

                    <Popconfirm
                        title="Подтверждение операции"
                        description="Вы подтверждаете операцию?"
                        onConfirm={() => {
                            formik.handleSubmit();
                            setIsModalOpen(false);
                        }}
                        okText="Да"
                        cancelText="Нет"
                    >
                        <Button
                            type="primary"
                            size={"large"}
                            className={cn("w-full mt-6")}
                            loading={mutation.isPending}
                        >
                            Подтвердить
                        </Button>
                    </Popconfirm>
                </Form>
            </Modal>
        </div>
    );
};
