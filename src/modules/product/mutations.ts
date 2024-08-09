import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { LoginRequest } from "../auth/types";
import { UpdateProductSizeRequest } from "../store/types";
import {
    autoUploadProductData,
    changeProductPrice,
    changeProductVisibility,
    createProductsFromFile,
    createProductSize,
    updateProductSize,
} from "./api";
import { ChangeProductPriceRequest, GetProductContent } from "./types";

export const createProductsFromFileMutation = () => {
    const { message } = App.useApp();

    return useMutation<
        GetProductContent[],
        AxiosError<any>,
        { formData: FormData; importType: string }
    >({
        async mutationFn({ formData, importType }) {
            const { data } = await createProductsFromFile(formData, importType);
            return data;
        },
        onSuccess() {
            message.success("Успешно!");
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};
export const updateProductSizeMutation = (id: number) => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>, UpdateProductSizeRequest>({
        async mutationFn(values: UpdateProductSizeRequest) {
            await updateProductSize(id, values);
        },
        onSuccess() {
            message.success("Успешно!");
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
export const createProductSizeMutation = (id: number) => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>, UpdateProductSizeRequest>({
        async mutationFn(values: UpdateProductSizeRequest) {
            await createProductSize(id, values);
        },
        onSuccess() {
            message.success("Успешно!");
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
        [{ id: number; is_published: boolean }]
    >({
        async mutationFn(values) {
            await changeProductVisibility(values);
        },
        onSuccess() {
            message.success("Успешно!");
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
            queryClient.invalidateQueries({
                queryKey: ["enabled-product-count"],
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
    return useMutation<void, AxiosError<any>, ChangeProductPriceRequest[]>({
        async mutationFn(values) {
            await changeProductPrice(values);
        },
        onSuccess() {
            message.success("Успешно!");
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
export const autoUploadDataMutation = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    return useMutation<any, AxiosError<any>, LoginRequest>({
        async mutationFn(values) {
            const response = await autoUploadProductData(values);
            return response;
        },
        onSuccess(response) {
            // message.success("Успешно!");
            message.success(response?.data?.detail);
            navigate("/seller");
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};
