import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { UpdateProductSizeRequest } from "../store/types";
import {
    changeProductPrice,
    changeProductVisibility,
    createProductsFromFile,
    updateProductSize,
} from "./api";
import { ChangeProductPriceRequest, GetProductContent } from "./types";

export const createProductsFromFileMutation = () => {
    const { message } = App.useApp();

    return useMutation<GetProductContent[], AxiosError<any>, FormData>({
        async mutationFn(formData) {
            const { data } = await createProductsFromFile(formData);
            return data;
        },
        onSuccess() {
            message.success("Success!");
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};
export const updateProductSizeMutation = (id: string) => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>, UpdateProductSizeRequest>({
        async mutationFn(values) {
            await updateProductSize(id, values);
        },
        onSuccess() {
            message.success("Success!");
            navigate("/employee/sizes/");
            queryClient.invalidateQueries({
                queryKey: ["productsWithSizes"],
            });
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};
export const changeProductsVisibilityMutation = () => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<
        void,
        AxiosError<any>,
        { id: number; isPublished: boolean }
    >({
        async mutationFn(values) {
            await changeProductVisibility(values.id, values.isPublished);
        },
        onSuccess() {
            message.success("Success!");
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
            queryClient.invalidateQueries({
                queryKey: ["products-prices"],
            });
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};

export const changeProductPriceMutation = () => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>, ChangeProductPriceRequest>({
        async mutationFn(values) {
            await changeProductPrice(values);
        },
        onSuccess() {
            message.success("Success!");
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
            queryClient.invalidateQueries({
                queryKey: ["products-prices"],
            });
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};
