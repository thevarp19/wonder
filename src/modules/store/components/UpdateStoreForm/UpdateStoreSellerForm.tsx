import { FormikInput } from "@/components/ui/FormikInput";
import { CitiesInput } from "@/modules/store/components/shared/CitiesInput";
// import { useGetStore } from "@/modules/store/queries";
import { cn } from "@/utils/shared.util";
import { Button, Checkbox, Form, Spin } from "antd";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { useUpdateStoreSeller } from "../../forms";
import { useGetSellerStore } from "../../queries";
import { UpdateWorkingTimeInput } from "./UpdateWorkingTimeInput";

interface UpdateStoreSellerFormProps {}

export const UpdateStoreSellerForm: FC<UpdateStoreSellerFormProps> = ({}) => {
    const { storeId } = useParams();
    const { data: storeDetails, isPending } = useGetSellerStore(
        Number(storeId)
    );
    const { formik, mutation } = useUpdateStoreSeller(
        Number(storeId),
        storeDetails
    );
    if (isPending) {
        return <Spin />;
    }
    return (
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
                    value={formik.values.warehouse.city}
                    onSelect={(_, option) => {
                        formik.setFieldValue("warehouse.city", option.value);
                    }}
                />
            </Form.Item>
            <FormikInput
                name="warehouse.street_name"
                formik={formik}
                value={formik.values.warehouse.street_name}
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
                value={formik.values.warehouse.street_number}
                formItemProps={{
                    label: "Номер здания",
                }}
                inputProps={{
                    size: "large",
                }}
            />
            <FormikInput
                name="warehouse.additional_information"
                value={formik.values.warehouse.additional_information}
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

            <Form.Item label={"Рабочее время"} className={cn("w-full !mb-4")}>
                <UpdateWorkingTimeInput
                    initialValues={storeDetails?.warehouse.operating_modes}
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
                Сохранить
            </Button>
        </Form>
    );
};
