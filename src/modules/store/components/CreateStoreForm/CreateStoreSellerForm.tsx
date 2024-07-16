import { FormikInput } from "@/components/ui/FormikInput";
import { cn } from "@/utils/shared.util";
import { Button, Checkbox, Form } from "antd";
import { FC } from "react";
import { useCreateStoreSeller } from "../../forms";
import { CitiesInput } from "../shared/CitiesInput";
import { WorkingTimeInput } from "./WorkingTimeInput";

interface CreateStoreSellerFormProps {}

export const CreateStoreSellerForm: FC<CreateStoreSellerFormProps> = () => {
    const { formik, mutation } = useCreateStoreSeller();
    return (
        <div className="flex flex-col gap-10 items-center md:border border-[#D9D9D9] rounded-[28px] md:px-[126px] px-4 md:py-[34px] pb-[68px] w-full md:w-auto">
            <h2 className="text-[18px] font-semibold">Создать новый склад</h2>

            <Form
                onFinish={formik.submitForm}
                layout="vertical"
                className="flex flex-col w-full md:max-w-[291px] gap-2"
            >
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
                <Form.Item label="Город" className="w-full !mb-4">
                    <CitiesInput
                        className=""
                        size="large"
                        onSelect={(_) => {
                            formik.setFieldValue("warehouse.city", 1);
                        }}
                    />
                </Form.Item>
                <FormikInput
                    name="warehouse.street_name"
                    formik={formik}
                    formItemProps={{
                        label: "Название улицы",
                    }}
                    inputProps={{
                        size: "large",
                    }}
                />
                <FormikInput
                    name="warehouse.street_number"
                    formik={formik}
                    formItemProps={{
                        label: "Номер здания",
                    }}
                    inputProps={{
                        size: "large",
                    }}
                />
                <FormikInput
                    name="warehouse.additional_information"
                    formik={formik}
                    formItemProps={{
                        label: "Дополнительная информация",
                    }}
                    inputProps={{
                        size: "large",
                    }}
                />
                <div className="flex gap-2 py-5">
                    <Checkbox
                        value={formik.values.warehouse.is_warehouse}
                        onChange={formik.handleChange}
                        name="warehouse.is_warehouse"
                    />
                    Склад
                </div>

                <Form.Item
                    label={"Рабочее время"}
                    className={cn("w-full !mb-4")}
                >
                    <WorkingTimeInput
                        onChange={(values) => {
                            formik.setFieldValue(
                                "warehouse.operating_modes",
                                values
                            );
                        }}
                    />
                </Form.Item>

                <Button
                    htmlType="submit"
                    type="primary"
                    size={"large"}
                    className={cn("w-full !rounded-md")}
                    loading={mutation.isPending}
                >
                    Создать
                </Button>
            </Form>
        </div>
    );
};
