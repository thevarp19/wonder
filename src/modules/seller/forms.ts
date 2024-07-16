import {
    emailSchema,
    KzPhoneNumberSchema,
    requiredStringSchema,
} from "@/lib/validations/shared";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import { sellerUpdateMutation } from "./mutations";
import { GetSellerProfile } from "./types";

const updateSellerProfileSchema = Yup.object().shape({
    phone_number: KzPhoneNumberSchema().required(),
    kaspi_store_name: requiredStringSchema(),
    kaspi_seller_id: requiredStringSchema(),
    kaspi_token: requiredStringSchema(),
    first_name: requiredStringSchema(),
    last_name: requiredStringSchema(),
    email: emailSchema().required(),
});

export const useUpdateSellerProfile = (
    initialValues: GetSellerProfile | undefined
) => {
    const mutation = sellerUpdateMutation();

    const formik = useFormik<GetSellerProfile>({
        initialValues: {
            phone_number: "",
            kaspi_store_name: "",
            kaspi_seller_id: "",
            kaspi_token: "",
            first_name: "",
            last_name: "",
            email: "",
        },
        validationSchema: updateSellerProfileSchema,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: async (values) => {
            await mutation.mutateAsync(values);
        },
    });

    useEffect(() => {
        if (initialValues) {
            formik.resetForm({
                values: initialValues,
            });
        }
    }, [initialValues]);

    return { formik, mutation };
};
