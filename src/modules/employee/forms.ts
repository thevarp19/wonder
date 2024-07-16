import {
    KzPhoneNumberSchema,
    emailSchema,
    passwordSchemas,
    requiredStringSchema,
} from "@/lib/validations/shared";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import { createEmployeeMutation, updateEmployeeMutation } from "./mutations";
import { CreateEmployeeRequest, GetEmployee } from "./types";

const createEmployeeSchema = Yup.object().shape({
    first_name: requiredStringSchema(),
    last_name: requiredStringSchema(),
    email: emailSchema().required("Почта обязательна для заполнения"),
    password: passwordSchemas().self.required(
        "Пароль обязателен для заполнения"
    ),
    repeatPassword: passwordSchemas().repeat.required("Повторите пароль"),
    phone_number: KzPhoneNumberSchema().required("Номер телефона обязателен"),
});

const updateEmployeeSchema = Yup.object().shape({
    first_name: requiredStringSchema(),
    last_name: requiredStringSchema(),
    email: emailSchema().required(),
    phone_number: KzPhoneNumberSchema().required(),
});

export const useCreateEmployee = (storeId: number, onSuccess?: () => void) => {
    const mutation = createEmployeeMutation(storeId, onSuccess);

    const formik = useFormik<CreateEmployeeRequest>({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            phone_number: "",
        },
        validationSchema: createEmployeeSchema,
        validateOnChange: true,
        onSubmit: handleSubmit,
    });

    async function handleSubmit() {
        await mutation.mutateAsync(formik.values);
    }

    return { formik, mutation };
};

export const useUpdateEmployee = (
    id: number,
    storeId: number,
    initialValues: GetEmployee,
    onSuccess?: () => void
) => {
    const mutation = updateEmployeeMutation(id, storeId, onSuccess);

    const formik = useFormik({
        initialValues: {
            id,
            first_name: "",
            last_name: "",
            email: "",
            phone_number: "",
        },
        validationSchema: updateEmployeeSchema,
        validateOnChange: true,
        onSubmit: handleSubmit,
    });

    useEffect(() => {
        if (initialValues) {
            formik.resetForm({
                values: initialValues,
            });
        }
    }, [initialValues]);

    async function handleSubmit() {
        await mutation.mutateAsync(formik.values);
    }

    return { formik, mutation };
};
