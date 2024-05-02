import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { createEmployee, deleteEmployee, updateEmployee } from "./api";
import { CreateEmployeeRequest, UpdateEmployeeRequest } from "./types";

export const createEmployeeMutation = (id: number, onSuccess?: () => void) => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>, CreateEmployeeRequest>({
        async mutationFn(values) {
            await createEmployee(values);
        },
        onSuccess() {
            message.success("Success!");

            queryClient.invalidateQueries({
                queryKey: [`employees`, `employee-${id}`],
            });
            if (onSuccess) onSuccess();
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};

export const updateEmployeeMutation = (id: number, onSuccess?: () => void) => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>, UpdateEmployeeRequest>({
        async mutationFn(values) {
            await updateEmployee(id, values);
        },
        onSuccess() {
            message.success("Success!");
            queryClient.invalidateQueries({
                queryKey: [`employees`, `employee-${id}`],
            });
            if (onSuccess) onSuccess();
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};

export const deleteEmployeeMutation = (id: number) => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>>({
        async mutationFn() {
            await deleteEmployee(id);
        },
        onSuccess() {
            message.success("Success!");

            queryClient.invalidateQueries({
                queryKey: [`employees`],
            });
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};
