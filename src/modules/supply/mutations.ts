import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { acceptSupplyProducts, createSupply, editSupplyStatus } from "./api";
import {
    AcceptSupplyProductRequest,
    CreateSupplyRequest,
    CreateSupplyResponse,
} from "./types";

export const createSupplyMutation = (
    onSuccess?: (supplyId: number, reportPath: string) => void
) => {
    const { message } = App.useApp();

    return useMutation<
        CreateSupplyResponse,
        AxiosError<any>,
        CreateSupplyRequest
    >({
        async mutationFn(values) {
            const { data } = await createSupply(values);
            return data;
        },
        onSuccess(data) {
            message.success("Успешно!");
            if (onSuccess) {
                onSuccess(data.id, data.report_row);
            }
        },
        onError(error) {
            message.error(`${error?.response?.data.error.message}`);
        },
    });
};

export const acceptSupplyMutation = (
    supplyId: number,
    onSuccess?: () => void
) => {
    const { message } = App.useApp();
    const navigate = useNavigate();

    return useMutation<void, AxiosError<any>, AcceptSupplyProductRequest>({
        async mutationFn(values) {
            await acceptSupplyProducts(values, supplyId);
        },
        onSuccess() {
            message.success("Успешно!");
            navigate("/employee/supplies");
            if (onSuccess) {
                onSuccess();
            }
        },
        onError(error) {
            message.error(`${error?.response?.data.error.message}`);
        },
    });
};

export const editSupplyStatusMutation = (supplyId: number) => {
    const { message } = App.useApp();

    return useMutation<void, AxiosError<any>, { status: string }>({
        async mutationFn(values) {
            await editSupplyStatus(supplyId, values);
        },
        onSuccess() {
            message.success("Статус успешно обновлен");
        },
        onError(error) {
            message.error(`${error?.response?.data.error.message}`);
        },
    });
};
