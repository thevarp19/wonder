import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { acceptSupplyProducts, createSupply } from "./api";
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
                onSuccess(data.id, data.report_a4);
            }
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};

export const acceptSupplyMutation = (onSuccess?: () => void) => {
    const { message } = App.useApp();
    const navigate = useNavigate();

    return useMutation<void, AxiosError<any>, AcceptSupplyProductRequest>({
        async mutationFn(values) {
            await acceptSupplyProducts(values);
        },
        onSuccess() {
            message.success("Успешно!");
            navigate("/employee/supplies");
            if (onSuccess) {
                onSuccess();
            }
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};
