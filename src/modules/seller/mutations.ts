import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { deleteSellerProfile, updateSellerProfile } from "./api";

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
            message.error(`${error?.response?.data.error.message}`);
        },
    });
};
export const deleteProfileMutation = () => {
    const { message } = App.useApp();

    const navigate = useNavigate();

    return useMutation<void, AxiosError<any>>({
        async mutationFn() {
            await deleteSellerProfile();
        },
        onSuccess() {
            message.success("Успешно!");
            navigate("/login");
        },
        onError(error) {
            message.error(`${error?.response?.data.error.message}`);
        },
    });
};
