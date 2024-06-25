import {
    KzPhoneNumberSchema,
    emailSchema,
    passwordSchemas,
    requiredStringSchema,
} from "@/lib/validations/shared";
import { useFormik } from "formik";
import { LoginRequest, LoginResponse } from "./types";

import * as Yup from "yup";
import { loginMutation, sellerRegisterMutation } from "./mutations";

const loginSchema = Yup.object().shape({
    email: emailSchema().required("Это обязательное поле"),
    password: passwordSchemas("password").self.required(
        "Это обязательное поле"
    ),
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
    firstName: requiredStringSchema("Имя"),
    lastName: requiredStringSchema("Фамилия"),
    email: emailSchema().required("Это обязательное поле"),
    phoneNumber: KzPhoneNumberSchema().required("Это обязательное поле"),
    password: passwordSchemas("password").self.required(
        "Это обязательное поле"
    ),
    repeatPassword: passwordSchemas("password").repeat.required(
        "Это обязательное поле"
    ),
    sellerName: requiredStringSchema("Название магазина"),
    sellerId: requiredStringSchema("ID продавца"),
    tokenKaspi: requiredStringSchema("Токен Каспи API"),
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
        await mutation.mutateAsync({
            ...formik.values,
            phoneNumber: formik.values.phoneNumber
                .replace(/\s/g, "")
                .substring(1),
        });
    }

    return { formik, mutation };
};
