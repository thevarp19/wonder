import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import {
    bindBoxToStore,
    createStore,
    removeBoxFromStore,
    updateStore,
} from "./api";
import { CreateStoreRequest, UpdateStoreRequest } from "./types";

export const createStoreMutation = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();

    return useMutation<void, AxiosError<any>, CreateStoreRequest>({
        async mutationFn(values) {
            const temp = values.dayOfWeekWorks.filter(
                (item) => item.numericDayOfWeek !== -1
            );

            await createStore({
                ...values,
                dayOfWeekWorks: temp,
            });
        },
        onSuccess() {
            message.success("Success!");
            navigate("/admin/settings/");
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};

export const updateStoreMutation = (id: number) => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>, UpdateStoreRequest>({
        async mutationFn(values) {
            const temp = values.dayOfWeekWorks.filter(
                (item) => item.numericDayOfWeek !== -1
            );

            await updateStore(id, {
                ...values,
                dayOfWeekWorks: temp,
            });
        },
        onSuccess() {
            message.success("Success!");
            navigate("/admin/settings/");
            queryClient.invalidateQueries({
                queryKey: ["stores"],
            });
        },
        onError(error) {
            console.error(error);
            message.error(`${error?.response?.data.message}`);
        },
    });
};

export const bindBoxToStoreMutation = () => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<
        void,
        AxiosError<any>,
        { storeId: string; boxId: string }
    >({
        async mutationFn(values) {
            await bindBoxToStore(values.storeId, values.boxId);
            queryClient.invalidateQueries({
                queryKey: ["stores"],
            });
        },
        onSuccess() {
            message.success("Success!");
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};

export const removeBoxFromStoreMutation = () => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<
        void,
        AxiosError<any>,
        { storeId: string; boxId: string }
    >({
        async mutationFn(values) {
            await removeBoxFromStore(values.storeId, values.boxId);
            queryClient.invalidateQueries({
                queryKey: ["stores"],
            });
        },
        onSuccess() {
            message.success("Success!");
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};
