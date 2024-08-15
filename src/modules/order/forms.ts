import { useFormik } from "formik";
import { cancelOrderMutation } from "./mutations";

export const useCancelOrder = (orderId: string) => {
    const mutation = cancelOrderMutation(parseInt(orderId));

    const formik = useFormik({
        initialValues: {
            cancellation_reason: "",
            cancellation_comment: "",
        },
        // validationSchema: createEmployeeSchema,
        // validateOnChange: true,
        onSubmit: handleSubmit,
    });

    async function handleSubmit() {
        await mutation.mutateAsync(formik.values);
    }

    return { formik, mutation };
};
