import {
    KzPhoneNumberSchema,
    emailSchema,
    requiredStringSchema,
} from "@/lib/validations/shared";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import { sellerUpdateMutation } from "./mutations";
import { GetSellerProfile } from "./types";

const updateSellerProfileSchema = Yup.object().shape({
    phoneNumber: KzPhoneNumberSchema().required(),
    sellerName: requiredStringSchema(),
    sellerId: requiredStringSchema(),
    tokenKaspi: requiredStringSchema(),
    firstName: requiredStringSchema(),
    lastName: requiredStringSchema(),
    email: emailSchema().required(),
});

export const useUpdateSellerProfile = (
    initialValues: GetSellerProfile | undefined
) => {
    const mutation = sellerUpdateMutation();

    const formik = useFormik<GetSellerProfile>({
        initialValues: {
            id: 0,
            phoneNumber: "",
            sellerName: "",
            sellerId: "",
            tokenKaspi: "",
            firstName: "",
            lastName: "",
            email: "",
        },
        validationSchema: updateSellerProfileSchema,
        validateOnBlur: true,
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
