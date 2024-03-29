import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
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

    return useMutation<void, void, CreateStoreRequest>({
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
        onError() {
            message.error("Error!");
        },
    });
};

export const updateStoreMutation = (id: string) => {
    const { message } = App.useApp();
    const navigate = useNavigate();

    return useMutation<void, void, UpdateStoreRequest>({
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
        },
        onError() {
            message.error("Error!");
        },
    });
};

export const bindBoxToStoreMutation = (storeId: string, boxId: string) => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation({
        async mutationFn() {
            await bindBoxToStore(storeId, boxId);
            queryClient.invalidateQueries({
                queryKey: ["stores"],
            });
        },
        onSuccess() {
            message.success("Success!");
        },
        onError() {
            message.error("Error!");
        },
    });
};

export const removeBoxFromStoreMutation = (storeId: string, boxId: string) => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation({
        async mutationFn() {
            await removeBoxFromStore(storeId, boxId);
            queryClient.invalidateQueries({
                queryKey: ["stores"],
            });
        },
        onSuccess() {
            message.success("Success!");
        },
        onError() {
            message.error("Error!");
        },
    });
};
