import { requiredStringSchema } from "@/lib/validations/shared";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { useFormik } from "formik";

import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    boxId: requiredStringSchema(),
});

export const useBindBoxToStore = (
    storeId: string,
    axiosAction: (storeId: string, boxId: string) => Promise<any>
) => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        async mutationFn() {
            await axiosAction(storeId, formik.values.boxId);
            queryClient.invalidateQueries({
                queryKey: ["stores-with-details"],
            });
        },
        onSuccess() {
            message.success("Success!");
        },
        onError() {
            message.error("Error!");
        },
    });

    const formik = useFormik({
        initialValues: {
            boxId: "",
        },
        validationSchema: validationSchema,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: handleSubmit,
    });

    async function handleSubmit() {
        await mutation.mutateAsync();
    }

    return { formik, mutation };
};
