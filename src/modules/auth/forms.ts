import {
    KzPhoneNumberSchema,
    emailSchema,
    passwordSchemas,
    requiredStringSchema,
} from "@/lib/validations/shared";
import { LoginRequest, LoginResponse } from "@/types/api";
import { useFormik } from "formik";

import * as Yup from "yup";
import { loginMutation, sellerRegisterMutation } from "./mutations";

const loginSchema = Yup.object().shape({
    email: emailSchema().required(),
    password: passwordSchemas("password").self.required(),
});

export const useLogin = (success: (loginData: LoginResponse) => void) => {
    const mutation = loginMutation(success);

    const formik = useFormik<LoginRequest>({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginSchema,
        validateOnChange: true,
        onSubmit: handleSubmit,
    });

    async function handleSubmit() {
        await mutation.mutateAsync(formik.values);
    }

    return { formik, mutation };
};

const sellerRegisterSchema = Yup.object().shape({
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
    const mutation = sellerRegisterMutation();

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
        validationSchema: sellerRegisterSchema,
        validateOnChange: true,
        onSubmit: handleSubmit,
    });

    async function handleSubmit() {
        await mutation.mutateAsync(formik.values);
    }

    return { formik, mutation };
};
