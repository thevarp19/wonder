import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { createSupply } from "./api";
import { CreateSupplyRequest } from "./types";

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
