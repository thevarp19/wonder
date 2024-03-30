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

export const bindBoxToStoreMutation = () => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<void, void, { storeId: string; boxId: string }>({
        async mutationFn(values) {
            await bindBoxToStore(values.storeId, values.boxId);
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

export const removeBoxFromStoreMutation = () => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    return useMutation<void, void, { storeId: string; boxId: string }>({
        async mutationFn(values) {
            await removeBoxFromStore(values.storeId, values.boxId);
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
