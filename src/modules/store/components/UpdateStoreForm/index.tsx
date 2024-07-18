import { FormikInput } from "@/components/ui/FormikInput";
import { UpdateWorkingTimeInput } from "@/modules/store/components/UpdateStoreForm/UpdateWorkingTimeInput";
import { CitiesInput } from "@/modules/store/components/shared/CitiesInput";
// import { useGetStore } from "@/modules/store/queries";
import { cn } from "@/utils/shared.util";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Popconfirm, Spin, Switch } from "antd";
import { FC } from "react";
import { Link, useParams } from "react-router-dom";
import { useUpdateStore } from "../../forms";
import { deleteStoreMutation } from "../../mutations";
import { useGetStore } from "../../queries";

interface UpdateStoreFormProps {}

export const UpdateStoreForm: FC<UpdateStoreFormProps> = ({}) => {
    const { storeId } = useParams();
    const { data: storeDetails, isPending } = useGetStore(Number(storeId));
    const { formik, mutation } = useUpdateStore(Number(storeId), storeDetails);

    const { mutateAsync, isPending: deleteLoading } = deleteStoreMutation(
        Number(storeId)
    );

    if (isPending) {
        return <Spin />;
    }
    return (
        <Form
            onFinish={formik.submitForm}
            layout="vertical"
            className="flex flex-col w-full md:max-w-[291px]"
        >
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
            <Form.Item label={"Статус"} className="!mb-4">
                <div className="flex items-center gap-2">
                    <Switch
                        checked={formik.values.enabled}
                        onChange={async (checked) => {
                            formik.setFieldValue("enabled", checked);
                        }}
                    />
                    <span className="text-base">
                        {formik.values.enabled ? "Активно" : "Неактивно"}
                    </span>
                </div>
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
                name="volume"
                formik={formik}
                formItemProps={{
                    label: "Объем склада",
                }}
                inputProps={{
                    size: "large",
                }}
            />
            <FormikInput
                name="rental_price"
                formik={formik}
                formItemProps={{
                    label: "Аренда склада",
                }}
                inputProps={{
                    size: "large",
                }}
            />
            <FormikInput
                name="warehouse.additional_information"
                formik={formik}
                value={formik.values.warehouse.additional_information}
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
            <div className="flex flex-col gap-2 ">
                <Button
                    htmlType="submit"
                    type="primary"
                    size={"large"}
                    className={cn("w-full mt-6")}
                    loading={mutation.isPending}
                >
                    Сохранить
                </Button>
                <Link to="/admin/settings" className="w-full cursor-pointer">
                    <Button size={"large"} className={cn("w-full !rounded-md")}>
                        Отмена
                    </Button>
                </Link>
                <Popconfirm
                    title="Удалить этот элемент"
                    description="Вы уверены, что хотите удалить этот элемент?"
                    cancelText="Отмена"
                    okButtonProps={{ loading: deleteLoading }}
                    onConfirm={async () => {
                        mutateAsync();
                    }}
                >
                    <Button danger size="large" icon={<DeleteOutlined />}>
                        Удалить склад
                    </Button>
                </Popconfirm>
            </div>
        </Form>
    );
};
