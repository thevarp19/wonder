import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { acceptProductByBarcode, placementProductByBarcode } from "./api";

export const acceptProductsMutation = () => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<
        void,
        AxiosError<any>,
        { supplyId: number; barcode: string; defective: boolean }
    >({
        async mutationFn(values) {
            await acceptProductByBarcode(
                values.barcode,
                values.supplyId,
                values.defective
            );
        },
        onSuccess() {
            message.success("Продукт успешно принят.");

            queryClient.invalidateQueries({
                queryKey: [`employee-supplies`],
            });
        },
        onError(error) {
            message.error(
                `${error?.response?.data.error.message || "Unknown error"}`
            );
        },
    });
};
export const placementProductsMutation = () => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<
        void,
        AxiosError<any>,
        { cellId: number; barcode: string }
    >({
        async mutationFn(values) {
            await placementProductByBarcode(values.cellId, values.barcode);
        },
        onSuccess() {
            message.success("Товар успешно размещен в ячейке!");

            queryClient.invalidateQueries({
                queryKey: [`employee-supplies`],
            });
            queryClient.invalidateQueries({
                queryKey: [`scan-cell-info`],
            });
        },
        onError(error) {
            message.error(
                `${error?.response?.data.error.message || "Unknown error"}`
            );
        },
    });
};
