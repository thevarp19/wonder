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
        <div className="flex flex-col gap-10 items-center md:border border-[#D9D9D9] rounded-[28px] md:px-[126px] px-4 md:py-[34px] pb-[68px] w-full md:w-auto">
            <h2 className="text-[18px] font-semibold">Создать новую коробку</h2>

            <Form
                onFinish={formik.submitForm}
                layout="vertical"
                className="flex flex-col w-full min-w-[291px] gap-2"
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
                            formik.values.files.filter(
                                // @ts-ignore
                                (f) => f.uid !== file.uid
                            )
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
                    className={cn("w-full !rounded-md mt-5")}
                    loading={mutation.isPending}
                >
                    {"Создать"}
                </Button>
            </Form>
        </div>
    );
};
