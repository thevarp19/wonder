import { FormikInput } from "@/components/ui/FormikInput";
import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FC } from "react";

interface UpdateSizesFormProps {
    formik: any;
}

export const UpdateSizesForm: FC<UpdateSizesFormProps> = ({ formik }) => {
    return (
        <>
            <Form className="">
                <FormikInput
                    name="length"
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
                    name="height"
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
                    name="width"
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
                    name="weight"
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
                <div className="flex flex-col gap-2">
                    <h2>Комментарий</h2>
                    <TextArea
                        name="comment"
                        value={formik.values.comment}
                        onChange={formik.handleChange}
                        className="w-full"
                    />
                </div>
            </Form>
        </>
    );
};
