import { FormikInput } from "@/components/ui/FormikInput";
import { phoneNumberChangeHandler } from "@/utils/form.util";
import { cn } from "@/utils/shared.util";
import { Button, Form } from "antd";
import { FC } from "react";
import { useUpdateEmployee } from "../../forms";
import { GetEmployee } from "../../types";

interface UpdateEmployeeFormProps {
    id: number;
    storeId: number;
    initialValues: GetEmployee;
    onSuccess?: () => void;
}

export const UpdateEmployeeForm: FC<UpdateEmployeeFormProps> = ({
    id,
    storeId,
    initialValues,
    onSuccess,
}) => {
    const { formik, mutation } = useUpdateEmployee(
        id,
        storeId,
        initialValues,
        onSuccess
    );

    return (
        <Form
            onFinish={formik.submitForm}
            layout="vertical"
            className="flex flex-col w-full max-w-xl gap-2 px-10"
        >
            <div className="flex items-center justify-between gap-4">
                <FormikInput
                    name="first_name"
                    formik={formik}
                    formItemProps={{
                        label: "Имя",
                        required: true,
                    }}
                    inputProps={{
                        size: "large",
                        style: { width: "100%" },
                    }}
                />
                <FormikInput
                    name="last_name"
                    formik={formik}
                    formItemProps={{
                        label: "Фамилия",
                        required: true,
                    }}
                    inputProps={{
                        size: "large",
                        style: { width: "100%" },
                    }}
                />
            </div>
            <div className="flex items-center justify-between gap-4">
                <FormikInput
                    name="phone_number"
                    formik={formik}
                    formItemProps={{ label: "Номер телефона", required: true }}
                    inputProps={{
                        size: "large",
                        onChange: (e) => {
                            phoneNumberChangeHandler(e, formik.handleChange);
                        },
                    }}
                />
                <FormikInput
                    name="email"
                    formik={formik}
                    formItemProps={{
                        label: "Электронная почта",
                        required: true,
                    }}
                    inputProps={{
                        size: "large",
                    }}
                />
            </div>

            <Button
                htmlType="submit"
                type="primary"
                size={"large"}
                className={cn("w-full mt-6")}
                loading={mutation.isPending}
            >
                {"Обновить"}
            </Button>
        </Form>
    );
};
