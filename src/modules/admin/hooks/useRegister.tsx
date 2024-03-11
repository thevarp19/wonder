"use client";
import { emailSchema, requiredStringSchema } from "@/utils/form.util";
import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    username: requiredStringSchema(),
    firstName: requiredStringSchema(),
    lastName: requiredStringSchema(),
    email: emailSchema,
    password: requiredStringSchema().max(20).min(6),
    repeatPassword: requiredStringSchema().test(
        "password-match",
        "Passwords must match",
        function (value) {
            return value === this.parent.password;
        }
    ),
});

export const useRegister = () => {
    const { message } = App.useApp();

    const mutation = useMutation({
        mutationFn: async () => {},
        onSuccess() {
            message.success("Success!");
        },
        onError() {
            message.error("Error!");
        },
    });

    const handleSubmit = async () => {
        const registerDTO = {
            username: formik.values.username,
            first_name: formik.values.firstName,
            last_name: formik.values.lastName,
            email: formik.values.email,
            password: formik.values.password,
        };
        await mutation.mutateAsync(registerDTO as any);
    };

    const formik = useFormik({
        initialValues: {
            username: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            repeatPassword: "",
        },
        validationSchema: validationSchema,
        validateOnBlur: true,
        validateOnChange: false,
        onSubmit: handleSubmit,
    });
    return { formik, mutation };
};
