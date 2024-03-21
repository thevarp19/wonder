import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { registerSeller } from "../api/auth";
import { SellerProductsResponse } from "../types/api";

export const useSupply = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();

    const mutation = useMutation<void, void, any>({
        async mutationFn(values) {
            await registerSeller(values);
        },
        onSuccess() {
            message.success("Success!");
            navigate("/seller/login");
        },
        onError() {
            message.error("Error!");
        },
    });

    const formik = useFormik<{
        products: SellerProductsResponse[];
    }>({
        initialValues: {
            products: [],
        },
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: handleSubmit,
    });

    async function handleSubmit() {
        const registerDTO = formik.values;
        await mutation.mutateAsync(registerDTO);
    }

    return { formik, mutation };
};
