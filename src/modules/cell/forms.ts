import { requiredNumberSchema } from "@/lib/validations/shared";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createCellMutation } from "./mutations";

const createCellSchema = Yup.object().shape({
    row: requiredNumberSchema(),
    column: requiredNumberSchema(),
    number: requiredNumberSchema(),
});

export const useCreateCell = (storeId: number) => {
    const mutation = createCellMutation();

    const formik = useFormik({
        initialValues: {
            storeId,
            row: 0,
            column: 0,
            number: 0,
        },
        validationSchema: createCellSchema,
        validateOnChange: true,
        onSubmit: handleSubmit,
    });

    async function handleSubmit() {
        await mutation.mutateAsync(formik.values);
    }

    return { formik, mutation };
};
