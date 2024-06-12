import { FormikInput } from "@/components/ui/FormikInput";
import { UpdateWorkingTimeInput } from "@/modules/store/components/UpdateStoreForm/UpdateWorkingTimeInput";
import { CitiesInput } from "@/modules/store/components/shared/CitiesInput";
import { useUpdateStore } from "@/modules/store/forms";
import { useGetStore } from "@/modules/store/queries";
import { cn } from "@/utils/shared.util";
import { Button, Form, Switch } from "antd";
import { FC } from "react";
import { useParams } from "react-router-dom";

interface UpdateStoreFormProps {}

export const UpdateStoreForm: FC<UpdateStoreFormProps> = ({}) => {
    const { storeId } = useParams();
    const { data: storeDetails } = useGetStore(Number(storeId));
    const { formik, mutation } = useUpdateStore(Number(storeId), storeDetails);
    return (
        <Form
            onFinish={formik.submitForm}
            layout="vertical"
            className="flex flex-col w-full max-w-sm gap-2 px-10"
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
            <Form.Item label="Город" className="w-full">
                <CitiesInput
                    className=""
                    size="large"
                    value={formik.values.cityId}
                    onSelect={(_, option) => {
                        formik.setFieldValue("cityId", option.value);
                    }}
                />
            </Form.Item>
            <Form.Item label={"Включено"}>
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
                    label: "Номер улицы",
                }}
                inputProps={{
                    size: "large",
                }}
            />

            <Form.Item label={"Рабочее время"} className={cn("w-max")}>
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
