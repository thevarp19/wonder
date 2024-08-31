import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { calculateParams, updateServiceParams } from "./api";
import { CalculatorRequest, UpdateServiceParamsRequest } from "./types";

export const updateServiceParamsMutation = (id: number) => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<any, AxiosError<any>, UpdateServiceParamsRequest>({
        async mutationFn(values) {
            const { data } = await updateServiceParams(id, values);
            return data;
        },
        onSuccess() {
            message.success("Успешно!");
            queryClient.invalidateQueries({
                queryKey: ["serviceParams"],
            });
        },

        onError(error) {
            message.error(`${error?.response?.data.error.message}`);
        },
    });
};

export const calculateMutation = () => {
    const { message } = App.useApp();
    return useMutation<any, AxiosError<any>, CalculatorRequest[]>({
        async mutationFn(values) {
            const { data } = await calculateParams(values);
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
