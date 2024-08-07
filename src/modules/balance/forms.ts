import {
    requiredNumberSchema,
    requiredStringSchema,
} from "@/lib/validations/shared";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addReplenishMutation } from "./mutations";

const replenishmentSchema = Yup.object().shape({
    iban: requiredStringSchema(),
    amount: requiredNumberSchema(),
});
export const useAddReplenishment = () => {
    const mutation = addReplenishMutation();

    const formik = useFormik({
        initialValues: {
            iban: "",
            amount: 0,
        },
        validationSchema: replenishmentSchema,
        validateOnChange: true,
        onSubmit: handleSubmit,
    });

    async function handleSubmit() {
        await mutation.mutateAsync(formik.values);
    }

    return { formik, mutation };
};
