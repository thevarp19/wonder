import { useFormik } from "formik";
import { useEffect } from "react";
import { createCellMutation, updateCellMutation } from "./mutations";
import { GetCellResponse } from "./types";
import { mapCreateCellToUpdate } from "./utils";

// const createCellSchema = Yup.object().shape({
//     row: requiredNumberSchema(),
//     col: requiredNumberSchema(),
//     cell: requiredNumberSchema(),
// });

export const useCreateCell = (storeId: number, onSuccess?: () => void) => {
    const mutation = createCellMutation(storeId, onSuccess);

    const formik = useFormik({
        initialValues: {
            line: 0,
            row: 0,
            col: 0,
            length: 0,
            width: 0,
            height: 0,
            comment: "",
        },
        // validationSchema: createCellSchema,
        // validateOnChange: true,
        onSubmit: handleSubmit,
    });

    async function handleSubmit() {
        await mutation.mutateAsync(formik.values);
    }

    return { formik, mutation };
};

export const useUpdateCell = (
    id: number,
    storeId: number,
    initialValues: GetCellResponse,
    onSuccess?: () => void
) => {
    const mutation = updateCellMutation(id, storeId, onSuccess);

    const formik = useFormik<{
        row: number;
        col: number;
        line: number;
        length?: number;
        height?: number;
        width?: number;
        comment?: string;
    }>({
        initialValues: {
            row: 0,
            col: 0,
            line: 0,
            length: 0,
            height: 0,
            width: 0,
            comment: "",
        },
        // validationSchema: createCellSchema,
        // validateOnChange: true,
        onSubmit: handleSubmit,
    });

    useEffect(() => {
        if (initialValues) {
            formik.resetForm({
                values: mapCreateCellToUpdate(initialValues),
            });
        }
    }, [initialValues]);

    async function handleSubmit() {
        await mutation.mutateAsync(formik.values);
    }

    return { formik, mutation };
};
