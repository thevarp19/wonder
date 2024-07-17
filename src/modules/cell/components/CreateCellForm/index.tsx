import { FormikInput, FormikNumberInput } from "@/components/ui/FormikInput";
import { cn } from "@/utils/shared.util";
import { Button, Form } from "antd";
import { FC } from "react";
import { useCreateCell } from "../../forms";

interface CreateCellFormProps {
    storeId: number;
    onSuccess?: () => void;
}

export const CreateCellForm: FC<CreateCellFormProps> = ({
    storeId,
    onSuccess,
}) => {
    const { formik, mutation } = useCreateCell(storeId, onSuccess);
    return (
        <Form
            onFinish={formik.submitForm}
            layout="vertical"
            className="flex flex-col flex-wrap w-full max-w-lg gap-2 px-10"
        >
            <div className="flex items-center gap-4">
                <FormikNumberInput
                    name="row"
                    formik={formik}
                    formItemProps={{
                        label: "Ряд",
                        required: true,
                    }}
                    inputProps={{
                        size: "large",
                        style: { width: "100%" },
                    }}
                />
                <FormikNumberInput
                    name="col"
                    formik={formik}
                    formItemProps={{
                        label: "Этаж",
                        required: true,
                    }}
                    inputProps={{
                        size: "large",
                        style: { width: "100%" },
                    }}
                />
                <FormikNumberInput
                    name="line"
                    formik={formik}
                    formItemProps={{
                        label: "Колона",
                        required: true,
                    }}
                    inputProps={{
                        size: "large",
                        style: { width: "100%" },
                    }}
                />
            </div>
            <div className="flex items-center gap-4">
                <FormikNumberInput
                    name="width"
                    formik={formik}
                    formItemProps={{
                        label: "Ширина (см)",
                        required: true,
                    }}
                    inputProps={{
                        size: "large",
                        style: { width: "100%" },
                    }}
                />
                <FormikNumberInput
                    name="height"
                    formik={formik}
                    formItemProps={{
                        label: "Высота (см)",
                        required: true,
                    }}
                    inputProps={{
                        size: "large",
                        style: { width: "100%" },
                    }}
                />
                <FormikNumberInput
                    name="length"
                    formik={formik}
                    formItemProps={{
                        label: "Глубина (см)",
                        required: true,
                    }}
                    inputProps={{
                        size: "large",
                        style: { width: "100%" },
                    }}
                />
            </div>
            <FormikInput
                name="comment"
                formik={formik}
                formItemProps={{
                    label: "Комментарий",
                }}
                inputProps={{
                    size: "large",
                    style: { width: "100%" },
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
