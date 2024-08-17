import { useFormik } from "formik";
import { cancelOrderMutation } from "./mutations";

export const useCancelOrder = (orderId: string, role: "admin" | "seller") => {
    const mutation = cancelOrderMutation(orderId, role);

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
