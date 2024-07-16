import { FormikInput, FormikNumberInput } from "@/components/ui/FormikInput";
import { cn } from "@/utils/shared.util";
import { Button, Form } from "antd";
import { FC } from "react";
import { useUpdateCell } from "../../forms";
import { GetCellResponse } from "../../types";

interface UpdateCellFormProps {
    id: number;
    storeId: number;
    initialValues: GetCellResponse;
    onSuccess?: () => void;
}

export const UpdateCellForm: FC<UpdateCellFormProps> = ({
    id,
    storeId,
    initialValues,
    onSuccess,
}) => {
    const { formik, mutation } = useUpdateCell(
        id,
        storeId,
        initialValues,
        onSuccess
    );
    return (
        <Form
            layout="vertical"
            className="flex flex-col w-full max-w-lg gap-2 px-10"
        >
            <div className="flex items-center gap-4">
                <FormikNumberInput
                    name="row"
                    formik={formik}
                    formItemProps={{
                        label: "Строка",
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
                        label: "Столбец",
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
                        label: "Номер",
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
                        label: "Ширина",
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
                        label: "Высота",
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
                        label: "Глубина",
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
                type="primary"
                size={"large"}
                className={cn("w-full mt-6")}
                loading={mutation.isPending}
                onClick={() => {
                    formik.submitForm();
                }}
            >
                {"Обновить ячейку"}
            </Button>
        </Form>
    );
};
