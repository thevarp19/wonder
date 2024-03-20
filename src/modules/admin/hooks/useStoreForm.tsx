import {
    requiredNumberSchema,
    requiredStringSchema,
} from "@/lib/validations/shared";
import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { useEffect } from "react";
import * as Yup from "yup";
import { createStore } from "../api/shared";
import { CreateStoreRequest } from "../types/api";

const validationSchema = Yup.object().shape({
    kaspiId: requiredStringSchema(),
    name: requiredStringSchema(),
    cityId: requiredNumberSchema(),
    street: requiredStringSchema(),
    apartment: requiredStringSchema(),
    // dayOfWeekWorks: Yup.array().of(
    //     Yup.object().shape({
    //         numericDayOfWeek: requiredNumberSchema(),
    //         openTime: requiredStringSchema(),
    //         closeTime: requiredStringSchema(),
    //     })
    // ),
});

export const useStoreForm = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    const mutation = useMutation<any, void, CreateStoreRequest>({
        async mutationFn(values) {
            const temp = values.dayOfWeekWorks.filter(
                (item) => item.numericDayOfWeek !== -1
            );
            const { data } = await createStore({
                ...values,
                dayOfWeekWorks: temp,
            });
            return data;
        },
        onSuccess() {
            message.success("Success!");
            navigate("/admin/settings/");
        },
        onError() {
            message.error("Error!");
        },
    });

    const formik = useFormik<CreateStoreRequest>({
        initialValues: {
            kaspiId: "",
            name: "",
            cityId: -1,
            street: "",
            apartment: "",
            dayOfWeekWorks: [],
        },
        validationSchema: validationSchema,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: handleSubmit,
    });

    async function handleSubmit() {
        await mutation.mutateAsync(formik.values);
    }

    useEffect(() => {
        console.log(formik.values);
    }, [formik.values]);

    return { formik, mutation };
};
