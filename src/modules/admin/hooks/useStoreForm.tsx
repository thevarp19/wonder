import { login } from "@/api/auth";
import jwtService from "@/lib/jwt";
import { emailSchema, passwordSchemas } from "@/lib/validations/shared";
import { LoginRequest, LoginResponse } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    email: emailSchema().required(),
    password: passwordSchemas("password").self.required(),
});

export const useStoreForm = (editProps?: any) => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    const mutation = useMutation<LoginResponse, void, LoginRequest>({
        async mutationFn(values) {
            const { data } = await login(values);
            return data;
        },
        onSuccess(data) {
            const { accessToken: access, refreshToken: refresh } = data;
            jwtService.saveJwt({ access, refresh });
            message.success("Success!");
            navigate("/admin/settings/");
        },
        onError() {
            message.error("Error!");
        },
    });

    const formik = useFormik<LoginRequest>({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        validateOnBlur: true,
        validateOnChange: false,
        onSubmit: handleSubmit,
    });

    async function handleSubmit() {
        await mutation.mutateAsync(formik.values);
    }

    return { formik, mutation };
};
