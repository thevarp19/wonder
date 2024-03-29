import {
    requiredNumberSchema,
    requiredStringSchema,
} from "@/lib/validations/shared";
import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import { createBox } from "../api/shared";

const validationSchema = Yup.object().shape({
    name: requiredStringSchema(),
    height: requiredNumberSchema().min(10),
    width: requiredNumberSchema().min(10),
    length: requiredNumberSchema().min(10),
});

export const useCreateBox = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    const mutation = useMutation({
        async mutationFn() {
            const formData = new FormData();
            formData.append("name", formik.values.name);
            const { height, width, length } = formik.values;
            formData.append("description", `${height}x${width}x${length}`);
            formik.values.files.forEach((file) => {
                formData.append("images", file);
            });
            await createBox(formData);
        },
        onSuccess() {
            message.success("Success!");
            navigate("/admin/settings/?menu_x=boxes");
        },
        onError() {
            message.error("Error!");
        },
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            height: 0,
            length: 0,
            width: 0,
            files: [],
        },
        validationSchema: validationSchema,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: handleSubmit,
    });

    async function handleSubmit() {
        await mutation.mutateAsync();
    }

    return { formik, mutation };
};
