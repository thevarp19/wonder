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
    const { data: storeDetails } = useGetStore(`${storeId}`);
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
                    label: "Kaspi ID",
                }}
                inputProps={{
                    size: "large",
                }}
            />
            <Form.Item label="City" className="w-full">
                <CitiesInput
                    className=""
                    size="large"
                    value={formik.values.cityId}
                    onSelect={(_, option) => {
                        formik.setFieldValue("cityId", option.value);
                    }}
                />
            </Form.Item>
            <Form.Item label={"Enabled"}>
                <div className="flex items-center gap-2">
                    <Switch
                        checked={formik.values.enabled}
                        onChange={async (checked) => {
                            formik.setFieldValue("enabled", checked);
                        }}
                    />
                    <span className="text-base">
                        {formik.values.enabled ? "Active" : "Not active"}
                    </span>
                </div>
            </Form.Item>
            <FormikInput
                name="street"
                formik={formik}
                formItemProps={{
                    label: "Street",
                }}
                inputProps={{
                    size: "large",
                }}
            />
            <FormikInput
                name="apartment"
                formik={formik}
                formItemProps={{
                    label: "Apartment number",
                }}
                inputProps={{
                    size: "large",
                }}
            />
            <Form.Item label={"Working time"} className={cn("w-max")}>
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
                {"Update"}
            </Button>
        </Form>
    );
};
