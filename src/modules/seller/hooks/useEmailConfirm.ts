import { requiredStringSchema } from "@/lib/validations/shared";
import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { confirmEmailSeller } from "../api/auth";
import { SellerEmailConfirmRequest } from "../types/api";

const validationSchema = Yup.object().shape({
    code: requiredStringSchema("Code"),
});

export const useEmailConfirm = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();

    const mutation = useMutation<void, void, SellerEmailConfirmRequest>({
        async mutationFn(values) {
            confirmEmailSeller(values);
        },
        onSuccess() {
            navigate("/seller/login");
        },
        onError() {
            message.error("Error invalid code!");
        },
    });

    const formik = useFormik<SellerEmailConfirmRequest>({
        initialValues: {
            code: "",
        },
        validationSchema: validationSchema,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: handleSubmit,
    });

    async function handleSubmit() {
        await mutation.mutateAsync(formik.values);
    }

    return { formik, mutation };
};
