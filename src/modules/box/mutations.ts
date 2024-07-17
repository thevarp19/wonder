import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { createBox, deleteBox } from "./api";
import { CreateBoxRequest } from "./types";

export const createBoxMutation = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    return useMutation<void, AxiosError<any>, CreateBoxRequest>({
        async mutationFn(values) {
            await createBox(values);
        },
        onSuccess() {
            message.success("Успешно!");
            navigate("/admin/settings/?menu_x=boxes");
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};

export const deleteBoxMutation = (id: number) => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>>({
        async mutationFn() {
            await deleteBox(id);
        },
        onSuccess() {
            message.success("Успешно!");
            navigate("/admin/settings/?menu_x=boxes");
            queryClient.invalidateQueries({
                queryKey: ["boxes"],
            });
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};
