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
import { GetEmployee } from "./types";

const createEmployeeSchema = Yup.object().shape({
    firstName: requiredStringSchema(),
    lastName: requiredStringSchema(),
    email: emailSchema().required(),
    password: passwordSchemas().self.required(),
    repeatPassword: passwordSchemas().repeat.required(),
    phoneNumber: KzPhoneNumberSchema(),
});

export const useCreateEmployee = (storeId: number, onSuccess?: () => void) => {
    const mutation = createEmployeeMutation(storeId, onSuccess);

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            repeatPassword: "",
            phoneNumber: "",
            storeId: 0,
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
    storeId: number,
    initialValues: GetEmployee,
    onSuccess?: () => void
) => {
    const mutation = updateEmployeeMutation(storeId, onSuccess);

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            storeId: 0,
        },
        validationSchema: createEmployeeSchema,
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
