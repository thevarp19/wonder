import { FormikInput } from "@/components/ui/FormikInput";
import { useCreateStore } from "@/modules/store/forms";
import { Form, Input } from "antd";
import { FC } from "react";

interface UpdateSizesFormProps {
    productId: number;
}

export const UpdateSizesForm: FC<UpdateSizesFormProps> = ({}) => {
    const { formik } = useCreateStore();

    return (
        <>
            <Form className="">
                <FormikInput
                    name="firstName"
                    formik={formik}
                    formItemProps={{
                        label: (
                            <div>
                                <p className="w-20 text-left">Длина: </p>
                            </div>
                        ),
                        className: "custom-no-after",
                        required: true,
                    }}
                    inputProps={{
                        style: { width: "100%" },
                    }}
                />
                <FormikInput
                    name="firstName"
                    formik={formik}
                    formItemProps={{
                        label: (
                            <div>
                                <p className="w-20 text-left">Высота: </p>
                            </div>
                        ),
                        className: "custom-no-after",
                        required: true,
                    }}
                    inputProps={{
                        style: { width: "100%" },
                    }}
                />
                <FormikInput
                    name="firstName"
                    formik={formik}
                    formItemProps={{
                        label: (
                            <div>
                                <p className="w-20 text-left">Ширина: </p>
                            </div>
                        ),
                        className: "custom-no-after",
                        required: true,
                    }}
                    inputProps={{
                        style: { width: "100%" },
                    }}
                />
                <FormikInput
                    name="firstName"
                    formik={formik}
                    formItemProps={{
                        label: (
                            <div>
                                <p className="w-20 text-left">Вес: </p>
                            </div>
                        ),
                        className: "custom-no-after",
                        required: true,
                    }}
                    inputProps={{
                        style: { width: "100%" },
                    }}
                />
            </Form>
            <Form layout="vertical">
                <Form.Item label="Комментарий">
                    <Input.TextArea />
                </Form.Item>
            </Form>
        </>
    );
};
