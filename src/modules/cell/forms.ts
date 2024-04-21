import { requiredNumberSchema } from "@/lib/validations/shared";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createCellMutation } from "./mutations";

const createCellSchema = Yup.object().shape({
    row: requiredNumberSchema(),
    col: requiredNumberSchema(),
    cell: requiredNumberSchema(),
});

export const useCreateCell = (storeId: number, onSuccess?: () => void) => {
    const mutation = createCellMutation(storeId, onSuccess);

    const formik = useFormik({
        initialValues: {
            storeId,
            row: 0,
            col: 0,
            cell: 0,
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
