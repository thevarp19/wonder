import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { addReplenishment, changeStatusReplenishment } from "./api";
import { AddReplenishmentRequest } from "./types";

export const addReplenishMutation = () => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>, AddReplenishmentRequest>({
        async mutationFn(values) {
            await addReplenishment(values);
        },
        onSuccess() {
            message.success("Успешно!");

            queryClient.invalidateQueries({
                queryKey: [`seller-replenishment`],
            });
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};
export const statusReplenishMutation = (id: number) => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>, any>({
        async mutationFn(values) {
            await changeStatusReplenishment(id, values);
        },
        onSuccess() {
            message.success("Успешно!");

            queryClient.invalidateQueries({
                queryKey: [`admin-replenishment`],
            });
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};
