import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { createProductsFromFile } from "./api";
import { GetProductResponse } from "./types";

export const createProductsFromFileMutation = () => {
    const { message } = App.useApp();

    return useMutation<GetProductResponse[], void, FormData>({
        async mutationFn(formData) {
            const { data } = await createProductsFromFile(formData);
            return data;
        },
        onSuccess() {
            message.success("Success!");
        },
        onError() {
            message.error("Error!");
        },
    });
};
