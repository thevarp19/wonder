import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { updateSellerProfile } from "./api";

export const sellerUpdateMutation = () => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>, FormData>({
        async mutationFn(values) {
            await updateSellerProfile(values);
        },
        onSuccess() {
            message.success("Успешно!");

            queryClient.invalidateQueries({ queryKey: ["seller-profile"] });
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};
