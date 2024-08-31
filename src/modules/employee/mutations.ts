import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { createEmployee, deleteEmployee, updateEmployee } from "./api";
import { CreateEmployeeRequest, UpdateEmployeeRequest } from "./types";

export const createEmployeeMutation = (
    storeId: number,
    onSuccess?: () => void
) => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>, CreateEmployeeRequest>({
        async mutationFn(values) {
            await createEmployee(values, storeId);
        },
        onSuccess() {
            message.success("Успешно!");

            queryClient.invalidateQueries({
                queryKey: [`employees`, storeId],
            });
            if (onSuccess) onSuccess();
        },
        onError(error) {
            message.error(`${error?.response?.data.error.message}`);
        },
    });
};

export const updateEmployeeMutation = (
    id: number,
    storeId: number,
    onSuccess?: () => void
) => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>, UpdateEmployeeRequest>({
        async mutationFn(values) {
            await updateEmployee(id, values);
        },
        onSuccess() {
            message.success("Успешно!");
            queryClient.invalidateQueries({
                queryKey: [`employees`, storeId],
            });
            queryClient.invalidateQueries({
                queryKey: [`employee`, id],
            });
            if (onSuccess) onSuccess();
        },
        onError(error) {
            message.error(`${error?.response?.data.error.message}`);
        },
    });
};

export const deleteEmployeeMutation = (id: number, storeId: number) => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>>({
        async mutationFn() {
            await deleteEmployee(id);
        },
        onSuccess() {
            message.success("Успешно!");

            queryClient.invalidateQueries({
                queryKey: [`employees`, storeId],
            });
        },
        onError(error) {
            message.error(`${error?.response?.data.error.message}`);
        },
    });
};
