import { useMutation, useQueryClient } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { createReportEmployee, updateReportEmployee } from "./api";

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
