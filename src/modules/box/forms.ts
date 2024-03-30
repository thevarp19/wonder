import {
    requiredNumberSchema,
    requiredStringSchema,
} from "@/lib/validations/shared";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createBoxMutation } from "./mutations";

const createBoxSchema = Yup.object().shape({
    name: requiredStringSchema(),
    height: requiredNumberSchema().min(10),
    width: requiredNumberSchema().min(10),
    length: requiredNumberSchema().min(10),
});

export const useCreateBox = () => {
    const mutation = createBoxMutation();

    const formik = useFormik({
        initialValues: {
            name: "",
            height: 0,
            length: 0,
            width: 0,
            files: [],
        },
        validationSchema: createBoxSchema,
        validateOnChange: true,
        onSubmit: handleSubmit,
    });

    async function handleSubmit() {
        await mutation.mutateAsync(formik.values);
    }

    return { formik, mutation };
};
