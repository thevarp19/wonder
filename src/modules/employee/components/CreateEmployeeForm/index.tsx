import { FormikInput, FormikPasswordInput } from "@/components/ui/FormikInput";
import { phoneNumberChangeHandler } from "@/utils/form.util";
import { cn } from "@/utils/shared.util";
import { Button, Form } from "antd";
import { FC } from "react";
import { useCreateEmployee } from "../../forms";

interface CreateEmployeeFormProps {
    storeId: number;
    onSuccess?: () => void;
}

export const CreateEmployeeForm: FC<CreateEmployeeFormProps> = ({
    storeId,
    onSuccess,
}) => {
    const { formik, mutation } = useCreateEmployee(storeId, onSuccess);
    return (
        <Form
            onFinish={formik.submitForm}
            layout="vertical"
            className="flex flex-col w-full max-w-xl gap-2 px-10"
        >
            <div className="flex items-center justify-between gap-4">
                <FormikInput
                    name="firstName"
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
                    name="lastName"
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
                    name="phoneNumber"
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
            <FormikPasswordInput
                name="password"
                formik={formik}
                formItemProps={{ label: "Пароль", required: true }}
                inputProps={{
                    size: "large",
                    type: "password",
                }}
            />
            <FormikPasswordInput
                name="repeatPassword"
                formik={formik}
                formItemProps={{ label: "Повторите пароль", required: true }}
                inputProps={{
                    size: "large",
                    type: "password",
                }}
            />

            <Button
                htmlType="submit"
                type="primary"
                size={"large"}
                className={cn("w-full mt-6")}
                loading={mutation.isPending}
            >
                {"Создать"}
            </Button>
        </Form>
    );
};
