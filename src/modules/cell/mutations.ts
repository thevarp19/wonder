import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { createCell, deleteCell } from "./api";
import { CreateCellRequest } from "./types";

export const createCellMutation = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    return useMutation<void, AxiosError<any>, CreateCellRequest>({
        async mutationFn(values) {
            await createCell(values);
        },
        onSuccess() {
            message.success("Success!");
            navigate("/admin/settings/?menu_x=cells");
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};

export const deleteCellMutation = (id: number) => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>>({
        async mutationFn() {
            await deleteCell(id);
        },
        onSuccess() {
            message.success("Success!");
            navigate("/admin/settings/?menu_x=cells");
            queryClient.invalidateQueries({
                queryKey: ["cells"],
            });
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};
