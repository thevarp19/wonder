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
            <FormikInput
                name="name"
                formik={formik}
                formItemProps={{
                    label: "Name",
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
