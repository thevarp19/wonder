import { FormikInput } from "@/components/ui/FormikInput";
import { BalanceHistoryTable } from "@/modules/balance/components/BalanceHistoryTable";
import { useAddReplenishment } from "@/modules/balance/forms";
import { useGetSellerReplenishment } from "@/modules/balance/queries";
import { phoneNumberChangeHandler } from "@/utils/form.util";
import { cn } from "@/utils/shared.util";
import { Button, Form, Modal, Popconfirm } from "antd";
import { FC, useState } from "react";

export const SellerBalancePage: FC = () => {
    const [page, setPage] = useState(0);
    const { data: orders, isPending } = useGetSellerReplenishment(page, 10);
    return (
        <div className="h-full">
            <div className="flex flex-col gap-5">
                <div className="flex items-center gap-10">
                    <h2 className="text-2xl font-semibold ">Баланс</h2>
                </div>
                <div className="text-lg">
                    <h2>Доступно: 0 ₸ </h2>
                </div>
                <div className="flex justify-end w-full">
                    <AddReplenishmentModal />
                </div>
                <div className="overflow-x-auto w-full md:mb-0 mb-[70px]">
                    <BalanceHistoryTable
                        data={orders}
                        isPending={isPending}
                        setPage={setPage}
                        page={page}
                    />
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
