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
                    onSelect={(_, option) => {
                        formik.setFieldValue("cityId", option.value);
                    }}
                />
            </Form.Item>
            <FormikInput
                name="streetName"
                formik={formik}
                formItemProps={{
                    label: "Street name",
                }}
                inputProps={{
                    size: "large",
                }}
            />
            <FormikInput
                name="streetNumber"
                formik={formik}
                formItemProps={{
                    label: "Street number",
                }}
                inputProps={{
                    size: "large",
                }}
            />
            <FormikInput
                name="town"
                formik={formik}
                formItemProps={{
                    label: "Town",
                }}
                inputProps={{
                    size: "large",
                }}
            />
            <FormikInput
                name="district"
                formik={formik}
                formItemProps={{
                    label: "District",
                }}
                inputProps={{
                    size: "large",
                }}
            />
            <FormikInput
                name="building"
                formik={formik}
                formItemProps={{
                    label: "Building",
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
                className={cn("w-full")}
                loading={mutation.isPending}
            >
                {"Create"}
            </Button>
        </Form>
    );
};
