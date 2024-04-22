import { requiredNumberSchema } from "@/lib/validations/shared";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import { createCellMutation, updateCellMutation } from "./mutations";
import { GetCellResponse } from "./types";
import { mapCreateCellToUpdate } from "./utils";

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

export const useUpdateCell = (
    storeId: number,
    initialValues: GetCellResponse,
    onSuccess?: () => void
) => {
    const mutation = updateCellMutation(storeId, onSuccess);

    const formik = useFormik<{
        storeId: number;
        row: number;
        col: number;
        cell: number;
        depth?: number;
        height?: number;
        width?: number;
        comment?: string;
    }>({
        initialValues: {
            storeId,
            row: 0,
            col: 0,
            cell: 0,
            depth: 0,
            height: 0,
            width: 0,
            comment: "",
        },
        validationSchema: createCellSchema,
        validateOnChange: true,
        onSubmit: handleSubmit,
    });

    useEffect(() => {
        if (initialValues) {
            formik.resetForm({
                values: mapCreateCellToUpdate(initialValues, storeId),
            });
        }
    }, [initialValues]);

    async function handleSubmit() {
        await mutation.mutateAsync(formik.values);
    }

    return { formik, mutation };
};
