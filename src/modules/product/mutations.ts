import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { createProductsFromFile } from "./api";
import { GetProductResponse } from "./types";

export const createProductsFromFileMutation = () => {
    const { message } = App.useApp();

    return useMutation<GetProductResponse[], AxiosError<any>, FormData>({
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
