import { CitiesInput } from "@/components/form/CitiesInput";
import { FormikInput } from "@/components/ui/FormikInput";
import { cn } from "@/utils/shared.util";
import { Button, Form } from "antd";
import { FC } from "react";
import { useCreateStore } from "../../hooks/useCreateStore";

interface CreateStoreFormProps {}

export const CreateStoreForm: FC<CreateStoreFormProps> = ({}) => {
    const { formik, mutation } = useCreateStore();
    return (
        <Form
            onFinish={formik.submitForm}
            layout="vertical"
            className="flex flex-col items-center w-full max-w-sm gap-2 px-10"
        >
            <FormikInput
                name="id"
                formik={formik}
                formItemProps={{
                    label: "ID",
                }}
                inputProps={{
                    size: "large",
                }}
            />
            <Form.Item label="City" className="w-full">
                <CitiesInput className="" size="large" />
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
                name="apartment_number"
                formik={formik}
                formItemProps={{
                    label: "Apartment number",
                }}
                inputProps={{
                    size: "large",
                }}
            />

            <Button
                htmlType="submit"
                type="primary"
                size={"large"}
                className={cn("w-full")}
                loading={mutation.isPending}
            >
                Create
            </Button>
        </Form>
    );
};
