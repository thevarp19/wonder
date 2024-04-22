import { FormikInput, FormikNumberInput } from "@/components/ui/FormikInput";
import { cn } from "@/utils/shared.util";
import { Button, Form } from "antd";
import { FC } from "react";
import { useUpdateCell } from "../../forms";
import { GetCellResponse } from "../../types";

interface UpdateCellFormProps {
    storeId: number;
    initialValues: GetCellResponse;
    onSuccess?: () => void;
}

export const UpdateCellForm: FC<UpdateCellFormProps> = ({
    storeId,
    initialValues,
    onSuccess,
}) => {
    const { formik, mutation } = useUpdateCell(
        storeId,
        initialValues,
        onSuccess
    );
    return (
        <Form
            onFinish={formik.submitForm}
            layout="vertical"
            className="flex flex-col w-full max-w-lg gap-2 px-10"
        >
            <div className="flex items-center gap-4">
                <FormikNumberInput
                    name="row"
                    formik={formik}
                    formItemProps={{
                        label: "Row",
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
                        label: "Column",
                        required: true,
                    }}
                    inputProps={{
                        size: "large",
                        style: { width: "100%" },
                    }}
                />
                <FormikNumberInput
                    name="cell"
                    formik={formik}
                    formItemProps={{
                        label: "Number",
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
                        label: "Width",
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
                        label: "Height",
                    }}
                    inputProps={{
                        size: "large",
                        style: { width: "100%" },
                    }}
                />
                <FormikNumberInput
                    name="depth"
                    formik={formik}
                    formItemProps={{
                        label: "Depth",
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
                    label: "Comment",
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
                {"Update"}
            </Button>
        </Form>
    );
};
