import { FormikInput } from "@/components/ui/FormikInput";
import { cn } from "@/utils/shared.util";
import { Button, Form } from "antd";
import { FC } from "react";
import { useCreateStore } from "../../forms";
import { CitiesInput } from "../shared/CitiesInput";
import { WorkingTimeInput } from "./WorkingTimeInput";

interface CreateStoreFormProps {}

export const CreateStoreForm: FC<CreateStoreFormProps> = () => {
    const { formik, mutation } = useCreateStore();
    return (
        <div className="flex flex-col gap-10 items-center border border-[#D9D9D9] rounded-[28px] px-[126px] py-[34px]">
            <h2 className="text-[18px] font-semibold">Создать новый склад</h2>

            <Form
                onFinish={formik.submitForm}
                layout="vertical"
                className="flex flex-col w-full max-w-[291px] gap-2"
            >
                <FormikInput
                    name="kaspiId"
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
                        onSelect={(_, option) => {
                            formik.setFieldValue("cityId", option.value);
                        }}
                    />
                </Form.Item>
                <FormikInput
                    name="streetName"
                    formik={formik}
                    formItemProps={{
                        label: "Название улицы",
                    }}
                    inputProps={{
                        size: "large",
                    }}
                />
                <FormikInput
                    name="streetNumber"
                    formik={formik}
                    formItemProps={{
                        label: "Номер здания",
                    }}
                    inputProps={{
                        size: "large",
                    }}
                />
                <FormikInput
                    name="warehouseVolume"
                    formik={formik}
                    formItemProps={{
                        label: "Объем склада",
                    }}
                    inputProps={{
                        size: "large",
                    }}
                />
                <FormikInput
                    name="rentPrice"
                    formik={formik}
                    formItemProps={{
                        label: "Аренда склада",
                    }}
                    inputProps={{
                        size: "large",
                    }}
                />

                <Form.Item
                    label={"Рабочее время"}
                    className={cn("w-max !mb-4")}
                >
                    <WorkingTimeInput
                        onChange={(values) => {
                            formik.setFieldValue("dayOfWeekWorks", values);
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
                    {"Создать"}
                </Button>
            </Form>
        </div>
    );
};
