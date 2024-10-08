import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import {
    createRefundReportEmployee,
    createReportEmployee,
    deleteEmployeeRefundReport,
    deleteEmployeeReport,
    updateRefundReportEmployee,
    updateReportEmployee,
} from "./api";

export const createReportMutation = () => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation<void, AxiosError<any>, FormData>({
        async mutationFn(values) {
            await createReportEmployee(values);
        },
        onSuccess() {
            message.success("Успешно!");

            queryClient.invalidateQueries({
                queryKey: [`employee-reports`],
            });
            navigate("/employee/reports");
        },
        onError(error) {
            message.error(`${error?.response?.data.error.message}`);
        },
    });
};
export const createRefundReportMutation = () => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation<void, AxiosError<any>, FormData>({
        async mutationFn(values) {
            await createRefundReportEmployee(values);
        },
        onSuccess() {
            message.success("Успешно!");

            queryClient.invalidateQueries({
                queryKey: [`employee-refund-reports`],
            });
            navigate("/employee/reports");
        },
        onError(error) {
            message.error(`${error?.response?.data.error.message}`);
        },
    });
};
export const updateReportMutation = (reportId: string) => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation<void, AxiosError<any>, FormData>({
        async mutationFn(values) {
            await updateReportEmployee(reportId, values);
        },
        onSuccess() {
            message.success("Успешно!");

            queryClient.invalidateQueries({
                queryKey: [`employee-reports`],
            });
            navigate("/employee/reports");
        },
        onError(error) {
            message.error(`${error?.response?.data.error.message}`);
        },
    });
};
export const updateRefundReportMutation = (reportId: string) => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation<void, AxiosError<any>, FormData>({
        async mutationFn(values) {
            await updateRefundReportEmployee(reportId, values);
        },
        onSuccess() {
            message.success("Успешно!");

            queryClient.invalidateQueries({
                queryKey: [`employee-refund-reports`],
            });
            navigate("/employee/reports");
        },
        onError(error) {
            message.error(`${error?.response?.data.error.message}`);
        },
    });
};
export const deleteReportMutation = (id: string) => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation<void, AxiosError<any>>({
        async mutationFn() {
            await deleteEmployeeReport(id);
        },
        onSuccess() {
            message.success("Успешно!");

            queryClient.invalidateQueries({
                queryKey: [`employee-reports`],
            });
            navigate("/employee/reports");
        },
        onError(error) {
            message.error(`${error?.response?.data.error.message}`);
        },
    });
};
export const deleteRefundReportMutation = (id: string) => {
    const { message } = App.useApp();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation<void, AxiosError<any>>({
        async mutationFn() {
            await deleteEmployeeRefundReport(id);
        },
        onSuccess() {
            message.success("Успешно!");

            queryClient.invalidateQueries({
                queryKey: [`employee-refund-reports`],
            });
            navigate("/employee/reports");
        },
        onError(error) {
            message.error(`${error?.response?.data.error.message}`);
        },
    });
};
