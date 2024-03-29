import {
    KzPhoneNumberSchema,
    emailSchema,
    passwordSchemas,
    requiredStringSchema,
} from "@/lib/validations/shared";
import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { registerSeller } from "../../api/auth";
import { SellerRegisterRequest } from "../../types/api";

const validationSchema = Yup.object().shape({
    firstName: requiredStringSchema("First name"),
    lastName: requiredStringSchema("Last name"),
    email: emailSchema().required(),
    phoneNumber: KzPhoneNumberSchema().required(),
    password: passwordSchemas("password").self.required(),
    repeatPassword: passwordSchemas("password").repeat.required(),
    sellerName: requiredStringSchema("Seller name"),
    sellerId: requiredStringSchema("Seller ID"),
    tokenKaspi: requiredStringSchema("Kaspi token"),
});

export const useSellerRegister = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();

    const mutation = useMutation<void, void, SellerRegisterRequest>({
        async mutationFn(values) {
            await registerSeller(values);
        },
        onSuccess() {
            message.success("Success!");
            navigate("/seller/login");
        },
        onError() {
            message.error("Error!");
        },
    });

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            password: "",
            repeatPassword: "",
            sellerName: "",
            sellerId: "",
            tokenKaspi: "",
        },
        validationSchema: validationSchema,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: handleSubmit,
    });

    async function handleSubmit() {
        const registerDTO = formik.values;
        await mutation.mutateAsync(registerDTO);
    }

    return { formik, mutation };
};
