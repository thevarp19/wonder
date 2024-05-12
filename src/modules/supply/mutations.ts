import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { acceptSupplyProducts, createSupply } from "./api";
import { AcceptSupplyProductRequest, CreateSupplyRequest } from "./types";

export const createSupplyMutation = (
    onSuccess?: (supplyId: number) => void
) => {
    const { message } = App.useApp();

    return useMutation<{ id: number }, AxiosError<any>, CreateSupplyRequest>({
        async mutationFn(values) {
            const { data } = await createSupply(values);
            return data;
        },
        onSuccess(data) {
            message.success("Success!");
            if (onSuccess) {
                onSuccess(data.id);
            }
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};

export const acceptSupplyMutation = (onSuccess?: () => void) => {
    const { message } = App.useApp();

    return useMutation<void, AxiosError<any>, AcceptSupplyProductRequest>({
        async mutationFn(values) {
            await acceptSupplyProducts(values);
        },
        onSuccess() {
            message.success("Success!");
            if (onSuccess) {
                onSuccess();
            }
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};
