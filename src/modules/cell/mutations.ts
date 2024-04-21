import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { createCell, deleteCell } from "./api";
import { CreateCellRequest } from "./types";

export const createCellMutation = (id: number, onSuccess?: () => void) => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>, CreateCellRequest>({
        async mutationFn(values) {
            await createCell(values);
        },
        onSuccess() {
            message.success("Success!");

            queryClient.invalidateQueries({
                queryKey: [`cells-${id}`],
            });
            if (onSuccess) onSuccess();
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};

export const deleteCellMutation = (id: number) => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>>({
        async mutationFn() {
            await deleteCell(id);
        },
        onSuccess() {
            message.success("Success!");

            queryClient.invalidateQueries({
                queryKey: [`cells-${id}`],
            });
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};
