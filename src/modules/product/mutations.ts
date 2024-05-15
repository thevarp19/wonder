import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import {
    changeProductPrice,
    changeProductVisibility,
    createProductsFromFile,
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
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};

export const changeProductPriceMutation = (vendorCode: string) => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>, ChangeProductPriceRequest[]>({
        async mutationFn(values) {
            await changeProductPrice(vendorCode, values);
        },
        onSuccess() {
            message.success("Success!");
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};
