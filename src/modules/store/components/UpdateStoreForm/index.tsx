import { FormikInput } from "@/components/ui/FormikInput";
import { UpdateWorkingTimeInput } from "@/modules/store/components/UpdateStoreForm/UpdateWorkingTimeInput";
import { CitiesInput } from "@/modules/store/components/shared/CitiesInput";
import { useUpdateStore } from "@/modules/store/forms";
import { useGetStore } from "@/modules/store/queries";
import { cn } from "@/utils/shared.util";
import { Button, Form, Spin, Switch } from "antd";
import { FC } from "react";
import { useParams } from "react-router-dom";

interface UpdateStoreFormProps {}

export const UpdateStoreForm: FC<UpdateStoreFormProps> = ({}) => {
    const { storeId } = useParams();
    const { data: storeDetails, isPending } = useGetStore(Number(storeId));
    const { formik, mutation } = useUpdateStore(Number(storeId), storeDetails);
    if (isPending) {
        return <Spin />;
    }
    return (
        <Form
            onFinish={formik.submitForm}
            layout="vertical"
            className="flex flex-col w-full max-w-[291px]"
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
                    value={formik.values.cityId}
                    onSelect={(_, option) => {
                        formik.setFieldValue("cityId", option.value);
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
            <Form.Item label={"Рабочее время"} className={cn("w-max !mb-4")}>
                <UpdateWorkingTimeInput
                    initialValues={storeDetails?.availableWorkTimes}
                    onChange={(values) => {
                        formik.setFieldValue("dayOfWeekWorks", values);
                    }}
                />
            </Form.Item>

            <Button
                htmlType="submit"
                type="primary"
                size={"large"}
                className={cn("w-full")}
                loading={mutation.isPending}
            >
                {"Обновить"}
            </Button>
        </Form>
    );
};
