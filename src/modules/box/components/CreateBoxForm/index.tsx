import { FormikInput, FormikNumberInput } from "@/components/ui/FormikInput";
import { cn } from "@/utils/shared.util";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Upload } from "antd";
import { FC } from "react";
import { useCreateBox } from "../../forms";

interface CreateBoxFormProps {}

export const CreateBoxForm: FC<CreateBoxFormProps> = ({}) => {
    const { formik, mutation } = useCreateBox();
    return (
        <Form
            onFinish={formik.submitForm}
            layout="vertical"
            className="flex flex-col w-full max-w-sm gap-2 px-10"
        >
            <FormikInput
                name="name"
                formik={formik}
                formItemProps={{
                    label: "Имя",
                }}
                inputProps={{
                    size: "large",
                }}
            />
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
                    label: "Длина",
                }}
                inputProps={{
                    size: "large",
                    style: { width: "100%" },
                }}
            />
            <Upload
                accept=".jpg,.jpeg,.png"
                beforeUpload={(file) => {
                    formik.setFieldValue("files", [
                        ...formik.values.files,
                        file,
                    ]);
                    return false;
                }}
                onRemove={(file) => {
                    formik.setFieldValue(
                        "files",
                        // @ts-ignore
                        formik.values.files.filter((f) => f.uid !== file.uid)
                    );
                    return true;
                }}
            >
                <Button size="large" icon={<UploadOutlined />}>
                    Загрузить файл
                </Button>
            </Upload>
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
