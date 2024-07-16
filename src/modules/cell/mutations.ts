import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { createCell, deleteCell, updateCell } from "./api";
import { CreateCellRequest, UpdateCellRequest } from "./types";

export const createCellMutation = (storeId: number, onSuccess?: () => void) => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>, CreateCellRequest>({
        async mutationFn(values) {
            await createCell(values, storeId);
        },
        onSuccess() {
            message.success("Успешно!");

            queryClient.invalidateQueries({
                queryKey: [`cells`, storeId],
            });
            if (onSuccess) onSuccess();
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};

export const updateCellMutation = (
    id: number,
    storeId: number,
    onSuccess?: () => void
) => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>, UpdateCellRequest>({
        async mutationFn(values) {
            await updateCell(id, values);
        },
        onSuccess() {
            message.success("Успешно!");

            queryClient.invalidateQueries({
                queryKey: [`cells`, storeId],
            });
            if (onSuccess) onSuccess();
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};

export const deleteCellMutation = (id: number, storeId: number) => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>>({
        async mutationFn() {
            await deleteCell(id);
        },
        onSuccess() {
            message.success("Успешно!");

            queryClient.invalidateQueries({
                queryKey: [`cells`, storeId],
            });
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};
