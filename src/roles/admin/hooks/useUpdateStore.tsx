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
import { updateStore } from "../api/shared";
import { GetStoresWithDetailsResponse, UpdateStoreRequest } from "../types/api";

const validationSchema = Yup.object().shape({
    kaspiId: requiredStringSchema(),
    name: requiredStringSchema(),
    cityId: requiredNumberSchema(),
    street: requiredStringSchema(),
    apartment: requiredStringSchema(),
});

export const useUpdateStore = (initialData?: GetStoresWithDetailsResponse) => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    const mutation = useMutation<any, void, UpdateStoreRequest>({
        async mutationFn(values) {
            const temp = values.dayOfWeekWorks.filter(
                (item) => item.numericDayOfWeek !== -1
            );
            const { data } = await updateStore(`${initialData?.id}`, {
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

    const formik = useFormik<UpdateStoreRequest>({
        initialValues: initialData
            ? {
                  kaspiId: initialData.kaspiId,
                  enabled: initialData.enabled,
                  name: "",
                  cityId: -1,
                  street: initialData.street,
                  apartment: initialData.address,
                  dayOfWeekWorks: initialData.availableWorkTimes.map(
                      (item) => ({
                          numericDayOfWeek: item.dayOfWeek,
                          openTime: item.openTime,
                          closeTime: item.closeTime,
                      })
                  ),
              }
            : {
                  kaspiId: "",
                  enabled: false,
                  name: "",
                  cityId: -1,
                  street: "",
                  apartment: "",
                  dayOfWeekWorks: [
                      { numericDayOfWeek: 0, openTime: "", closeTime: "" },
                      { numericDayOfWeek: 1, openTime: "", closeTime: "" },
                      { numericDayOfWeek: 2, openTime: "", closeTime: "" },
                      { numericDayOfWeek: 3, openTime: "", closeTime: "" },
                      { numericDayOfWeek: 4, openTime: "", closeTime: "" },
                      { numericDayOfWeek: 5, openTime: "", closeTime: "" },
                      { numericDayOfWeek: 6, openTime: "", closeTime: "" },
                  ],
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
