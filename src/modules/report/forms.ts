import { useFormik } from "formik";
import { useEffect } from "react";
import { createReportMutation, updateReportMutation } from "./mutations";
import {
    CreateEmployeeReportRequest,
    GetEmployeeReportsContent,
} from "./types";

export const useCreateReport = () => {
    const mutation = createReportMutation();

    const formik = useFormik<CreateEmployeeReportRequest>({
        initialValues: {
            check_url: "",
            created_at: "",
            seller: 0,
        },

        onSubmit: handleSubmit,
    });

    async function handleSubmit() {
        const formData = new FormData();

        formData.append("seller", formik.values.seller.toString());
        formData.append("created_at", formik.values.created_at);

        if (formik.values.check_url) {
            formData.append("check_url", formik.values.check_url);
        }

        await mutation.mutateAsync(formData);
    }

    return { formik, mutation };
};

export const useUpdateReport = (
    reportId: string,
    initialValues: GetEmployeeReportsContent | undefined
) => {
    const mutation = updateReportMutation(reportId);

    const formik = useFormik<any>({
        initialValues: {
            check_url: "",
            created_at: "",
            seller: 0,
        },
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
        const formData = new FormData();

        if (formik.values.seller !== initialValues?.seller) {
            formData.append("seller", formik.values.seller.toString());
        }

        if (formik.values.created_at !== initialValues?.created_at) {
            formData.append("created_at", formik.values.created_at);
        }

        if (formik.values.check_url instanceof File) {
            formData.append("check_url", formik.values.check_url);
        } else if (
            typeof formik.values.check_url === "string" &&
            formik.values.check_url !== initialValues?.check_url
        ) {
            formData.append("check_url", formik.values.check_url);
        }

        await mutation.mutateAsync(formData);
    }

    return { formik, mutation };
};
