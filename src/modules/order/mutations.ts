import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import {
    assembleToPackage,
    cancelOrderAdmin,
    cancelOrderProductEmployee,
    orderCodeConfirm,
    orderCodeRequest,
    orderStatus,
    replacementOrderProductEmployee,
} from "./api";
import {
    GetAssembleOrderProductEmployee,
    ProductStatusChangeRequest,
} from "./types";

export const orderStatusMutation = () => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>, ProductStatusChangeRequest[]>({
        async mutationFn(values) {
            await orderStatus(values);
        },
        onSuccess() {
            message.success("Успешно!");
            queryClient.invalidateQueries({
                queryKey: [`orders-employee-assemble`],
            });
            queryClient.invalidateQueries({
                queryKey: [`orders-employee-package`],
            });
            queryClient.invalidateQueries({
                queryKey: [`orders-employee-transfer`],
            });
        },
        onError(error) {
            message.error(`${error?.response?.data.error.message}`);
        },
    });
};

export const cancelOrderMutation = (
    orderId: string,
    role: "admin" | "seller"
) => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>, any>({
        async mutationFn(values) {
            await cancelOrderAdmin(orderId, values);
        },
        onSuccess() {
            message.success("Успешно!");
            queryClient.invalidateQueries({
                queryKey: [`orders-employee`],
            });
            queryClient.invalidateQueries({
                queryKey: [`orders-admin`],
            });
            queryClient.invalidateQueries({
                queryKey: [`orders-seller`],
            });
            navigate(`/${role}/orders`);
        },
        onError(error) {
            message.error(`${error?.response?.data.error.message}`);
        },
    });
};

export const replacementOrderProductMutation = (productId: number) => {
    const { message } = App.useApp();

    return useMutation<
        GetAssembleOrderProductEmployee,
        AxiosError<any>,
        { reason: "LOST" | "DEFECTIVE" }
    >({
        async mutationFn(values) {
            const { data } = await replacementOrderProductEmployee(
                productId,
                values.reason
            );
            return data;
        },
        onSuccess() {
            message.success("Успешно!");
        },
        onError(error) {
            message.error(`${error?.response?.data.error.message}`);
        },
    });
};

export const cancelOrderProductMutation = (productId: number) => {
    const { message } = App.useApp();

    return useMutation<
        GetAssembleOrderProductEmployee,
        AxiosError<any>,
        {
            reason:
                | "BUYER_CANCELLATION_BY_MERCHANT"
                | "BUYER_NOT_REACHABLE"
                | "MERCHANT_OUT_OF_STOCK";
            notes: string;
        }
    >({
        async mutationFn(values) {
            const { data } = await cancelOrderProductEmployee(
                productId,
                values
            );
            return data;
        },
        onSuccess() {
            message.success("Успешно!");
        },
        onError(error) {
            message.error(`${error?.response?.data.error.message}`);
        },
    });
};

export const orderCodeRequestMutation = (orderId: string) => {
    const { message } = App.useApp();
    return useMutation<void, AxiosError<any>, void>({
        async mutationFn() {
            await orderCodeRequest(orderId);
        },
        onSuccess() {
            message.success("На ваш каспи отправлен код!");
        },
        onError(error) {
            message.error(`${error?.response?.data.error.message}`);
        },
    });
};
export const orderCodeConfirmMutation = (orderId: string) => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>, { code: string }>({
        async mutationFn(values: { code: string }) {
            await orderCodeConfirm(orderId, values.code);
        },
        onSuccess() {
            message.success("Успешно!");
            queryClient.invalidateQueries({
                queryKey: [`order-detail-employee`],
            });
        },
        onError(error) {
            message.error(`${error?.response?.data.error.message}`);
        },
    });
};

export const assembleToPackageMutation = (productId: number) => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>, { code: string }>({
        async mutationFn(values: { code: string }) {
            await assembleToPackage(productId, values.code);
        },
        onSuccess() {
            message.success("Успешно!");
            queryClient.invalidateQueries({
                queryKey: [`order-detail-employee`],
            });
        },
        onError(error) {
            message.error(`${error?.response?.data.error.message}`);
        },
    });
};
