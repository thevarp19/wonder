import { FormikInput } from "@/components/ui/FormikInput";
import { Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FC, useRef } from "react";

interface UpdateSizesFormProps {
    formik: any;
}

export const UpdateSizesForm: FC<UpdateSizesFormProps> = ({ formik }) => {
    const lengthRef = useRef<any>(null);
    const heightRef = useRef<any>(null);
    const widthRef = useRef<any>(null);
    const weightRef = useRef<any>(null);
    const commentRef = useRef<any>(null);

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>,
        nextRef: React.RefObject<any>
    ) => {
        if (event.key === "Enter") {
            event.preventDefault();
            nextRef.current?.focus();
        }
    };

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
                        onKeyDown: (e) => handleKeyDown(e, heightRef),
                    }}
                    inputRef={lengthRef}
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
                        onKeyDown: (e) => handleKeyDown(e, widthRef),
                    }}
                    inputRef={heightRef}
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
                        onKeyDown: (e) => handleKeyDown(e, weightRef),
                    }}
                    inputRef={widthRef}
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
                        onKeyDown: (e) => handleKeyDown(e, commentRef),
                    }}
                    inputRef={weightRef}
                />
                <div className="flex flex-col gap-2">
                    <h2>Комментарий</h2>
                    <TextArea
                        name="comment"
                        value={formik.values.comment}
                        onChange={formik.handleChange}
                        className="w-full"
                        ref={commentRef}
                    />
                </div>
            </Form>
        </>
    );
};
