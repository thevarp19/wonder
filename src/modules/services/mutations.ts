import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { updateServiceParams } from "./api";
import { UpdateServiceParamsRequest } from "./types";

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
            const errorMessage =
                error?.response?.data?.message ||
                error.message ||
                "Произошла ошибка";
            message.error(errorMessage);
        },
    });
};
