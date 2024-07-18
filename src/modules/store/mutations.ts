import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import {
    activateStoreSeller,
    bindBoxToStore,
    createStore,
    createStoreSeller,
    removeBoxFromStore,
    updateStore,
    updateStoreSeller,
    updateStoreStatus,
    updateStoreStatusSeller,
} from "./api";
import {
    ActivateStoreSellerRequest,
    CreateStoreRequest,
    CreateStoreSellerRequest,
    UpdateStoreRequest,
    UpdateStoreSellerRequest,
} from "./types";

export const createStoreMutation = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();

    return useMutation<void, AxiosError<any>, CreateStoreRequest>({
        async mutationFn(values) {
            const temp = values.warehouse.operating_modes.filter(
                (item) => item.day !== -1
            );

            await createStore({
                ...values,
                warehouse: { ...values.warehouse, operating_modes: temp },
            });
        },
        onSuccess() {
            message.success("Успешно!");
            navigate("/admin/settings/");
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};
export const createStoreSellerMutation = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();

    return useMutation<void, AxiosError<any>, CreateStoreSellerRequest>({
        async mutationFn(values) {
            const temp = values.warehouse.operating_modes.filter(
                (item) => item.day !== -1
            );

            await createStoreSeller({
                ...values,
                warehouse: { ...values.warehouse, operating_modes: temp },
            });
        },
        onSuccess() {
            message.success("Успешно!");
            navigate("/seller/settings/");
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};
export const activateStoreSellerMutation = (wonder_id: number) => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation<void, AxiosError<any>, ActivateStoreSellerRequest>({
        async mutationFn(values) {
            await activateStoreSeller(values, wonder_id);
        },
        onSuccess() {
            message.success("Успешно!");
            navigate("/seller/settings/");
            queryClient.invalidateQueries({
                queryKey: ["stores-seller"],
            });
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};

export const updateStoreStatusMutation = (id: number) => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>, { enabled: boolean }>({
        async mutationFn(values) {
            await updateStoreStatus(id, values);
        },
        onSuccess() {
            message.success("Успешно!");
            navigate("/admin/settings/");
            queryClient.invalidateQueries({
                queryKey: ["stores"],
            });
            queryClient.invalidateQueries({
                queryKey: ["stores-seller"],
            });
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};
export const updateStoreStatusSellerMutation = (id: number) => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>, { enabled: boolean }>({
        async mutationFn(values) {
            await updateStoreStatusSeller(id, values);
        },
        onSuccess() {
            message.success("Успешно!");
            navigate("/seller/settings/");
            queryClient.invalidateQueries({
                queryKey: ["stores-seller"],
            });
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
            const temp = values.warehouse.operating_modes.filter(
                (item) => item.day !== -1
            );

            await updateStore(id, {
                ...values,
                warehouse: { ...values.warehouse, operating_modes: temp },
            });
        },
        onSuccess() {
            message.success("Успешно!");
            navigate("/admin/settings/");
            queryClient.invalidateQueries({
                queryKey: ["stores-seller"],
            });
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};

export const updateStoreSellerMutation = (id: number) => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    return useMutation<void, AxiosError<any>, UpdateStoreSellerRequest>({
        async mutationFn(values) {
            const temp = values.warehouse.operating_modes.filter(
                (item) => item.day !== -1
            );

            await updateStoreSeller(id, {
                ...values,
                warehouse: { ...values.warehouse, operating_modes: temp },
            });
        },
        onSuccess() {
            message.success("Успешно!");
            navigate("/seller/settings/");
            queryClient.invalidateQueries({
                queryKey: ["stores"],
            });
        },
        onError(error) {
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
        { storeId: number; boxId: number }
    >({
        async mutationFn(values) {
            await bindBoxToStore(values.storeId, values.boxId);
            queryClient.invalidateQueries({
                queryKey: ["storeBox", values.storeId],
            });
        },
        onSuccess() {
            message.success("Успешно!");
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
        { storeId: number; boxId: number }
    >({
        async mutationFn(values) {
            await removeBoxFromStore(values.storeId, values.boxId);
            queryClient.invalidateQueries({
                queryKey: ["storeBox", values.storeId],
            });
        },
        onSuccess() {
            message.success("Успешно!");
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};
