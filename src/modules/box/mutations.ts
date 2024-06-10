import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { createBox, deleteBox } from "./api";

export const createBoxMutation = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    return useMutation<
        void,
        AxiosError<any>,
        {
            name: string;
            height: number;
            width: number;
            length: number;
            files: any[];
        }
    >({
        async mutationFn(values) {
            const formData = new FormData();
            formData.append("name", values.name);
            const { height, width, length } = values;
            formData.append("description", `${height}x${width}x${length}`);
            values.files.forEach((file) => {
                formData.append("images", file);
            });
            await createBox(formData);
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
