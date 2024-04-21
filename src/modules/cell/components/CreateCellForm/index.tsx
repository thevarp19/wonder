import { FormikNumberInput } from "@/components/ui/FormikInput";
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
            className="flex flex-col w-full max-w-sm gap-2 px-10"
        >
            <FormikNumberInput
                name="row"
                formik={formik}
                formItemProps={{
                    label: "Row",
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
                {"Create"}
            </Button>
        </Form>
    );
};
