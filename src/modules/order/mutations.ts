import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App, notification } from "antd";
import { AxiosError } from "axios";
import {
    finishAssemble,
    finishPackage,
    packageProducts,
    startAssemble,
    startPackage,
} from "./api";

export const startAssembleMutation = (orderId: number) => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>>({
        async mutationFn() {
            await startAssemble(orderId);
        },
        onSuccess() {
            message.success("Успешно!");
            queryClient.invalidateQueries({
                queryKey: [`order-employee-${orderId}`],
            });
            notification.success({
                message: "Состояние!",
                duration: 6,
                description: "Сборка началось. Отсканируйте товары.",
                placement: "topRight",
            });
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};
export const finishAssembleMutation = (orderId: number) => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>>({
        async mutationFn() {
            await finishAssemble(orderId);
        },
        onSuccess() {
            message.success("Успешно!");
            queryClient.invalidateQueries({
                queryKey: [`order-employee-${orderId}`],
            });
            notification.success({
                message: "Состояние!",
                duration: 6,
                description: "Сборка завершена. Упакуйте товары.",
                placement: "topRight",
            });
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};

export const startPackageMutation = (orderId: number) => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>>({
        async mutationFn() {
            await startPackage(orderId);
        },
        onSuccess() {
            message.success("Успешно!");
            queryClient.invalidateQueries({
                queryKey: [`order-employee-${orderId}`],
            });
            notification.success({
                message: "Состояние!",
                duration: 6,
                description:
                    "Упаковка началось. Выберите товары которые упаковали.",
                placement: "topRight",
            });
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};
export const finishPackageMutation = (orderId: number) => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>>({
        async mutationFn() {
            await finishPackage(orderId);
        },
        onSuccess() {
            message.success("Успешно!");
            queryClient.invalidateQueries({
                queryKey: [`order-employee-${orderId}`],
            });
            notification.success({
                message: "Состояние!",
                duration: 6,
                description: "Упаковка завершена.",
                placement: "topRight",
            });
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};
export const packageProductsMutation = (orderId: number) => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>, any>({
        async mutationFn(values) {
            await packageProducts(orderId, values);
        },
        onSuccess() {
            message.success("Успешно!");
            queryClient.invalidateQueries({
                queryKey: [`order-employee-${orderId}`],
            });
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};
