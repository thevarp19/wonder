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
    // username: emailSchema().required("Это обязательное поле"),
    password: passwordSchemas("password").self.required(
        "Это обязательное поле"
    ),
});

export const useLogin = (success: (loginData: LoginResponse) => void) => {
    const mutation = loginMutation(success);

    const formik = useFormik<LoginRequest>({
        initialValues: {
            username: "",
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
    first_name: requiredStringSchema("Имя"),
    last_name: requiredStringSchema("Фамилия"),
    email: emailSchema().required("Это обязательное поле"),
    phone_number: KzPhoneNumberSchema().required("Это обязательное поле"),
    password: passwordSchemas("password").self.required(
        "Это обязательное поле"
    ),
    kaspi_store_name: requiredStringSchema("Название магазина"),
    kaspi_seller_id: requiredStringSchema("ID продавца"),
    kaspi_email: emailSchema().required("Это обязательное поле"),
    kaspi_password: requiredStringSchema("Каспи пороль"),
    kaspi_token: requiredStringSchema("Токен Каспи API"),
});

export const useSellerRegister = () => {
    const mutation = sellerRegisterMutation();
    // const { message } = App.useApp();
    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
            password: "",
            kaspi_store_name: "",
            kaspi_seller_id: "",
            kaspi_token: "",
            merchant_email: "",
            merchant_password: "",
        },
        validationSchema: sellerRegisterSchema,
        validateOnChange: true,
        onSubmit: handleSubmit,
    });

    async function handleSubmit() {
        // if (!agreement) {
        //     message.error(
        //         "Пожалуйста, согласитесь с условиями и конфиденциальностью"
        //     );
        //     return;
        // }

        await mutation.mutateAsync({
            ...formik.values,
            phone_number: formik.values.phone_number
                .replace(/\s/g, "")
                .substring(1),
        });
    }

    return { formik, mutation };
};
