import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { orderPackage } from "./api";
import { ProductStatusChangeRequest } from "./types";

export const orderPackageMutation = () => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>, ProductStatusChangeRequest[]>({
        async mutationFn(values) {
            await orderPackage(values);
        },
        onSuccess() {
            message.success("Успешно!");
            queryClient.invalidateQueries({
                queryKey: [`orders-employee-package`],
            });
            queryClient.invalidateQueries({
                queryKey: [`orders-employee-assemble`],
            });
        },
        onError(error) {
            message.error(`${error?.response}`);
        },
    });
};

// export const packageProductsMutation = (orderId: number) => {
//     const { message } = App.useApp();
//     const queryClient = useQueryClient();
//     return useMutation<void, AxiosError<any>, any>({
//         async mutationFn(values) {
//             await packageProducts(orderId, values);
//         },
//         onSuccess() {
//             message.success("Успешно!");
//             queryClient.invalidateQueries({
//                 queryKey: [`order-employee-${orderId}`],
//             });
//         },
//         onError(error) {
//             message.error(`${error?.response?.data.message}`);
//         },
//     });
// };
