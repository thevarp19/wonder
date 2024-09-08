import { useQuery } from "@tanstack/react-query";
import {
    getEmployeeReportById,
    getEmployeeReports,
    getEmployeeStores,
} from "./api";
import {
    GetEmployeeReports,
    GetEmployeeReportsContent,
    GetEmployeeStores,
} from "./types";

export const useGetEmployeeReports = (
    page: number = 0,
    size: number = 10,
    searchValue: string = "",
    min_date: string = "",
    max_date: string = ""
) => {
    return useQuery<GetEmployeeReports>({
        queryKey: [
            `employee-reports`,
            page,
            size,
            searchValue,
            min_date,
            max_date,
        ],
        queryFn: async () => {
            const { data } = await getEmployeeReports(
                page,
                size,
                searchValue,
                min_date,
                max_date
            );
            return data;
        },
    });
};
export const useGetEmployeeStores = () => {
    return useQuery<GetEmployeeStores>({
        queryKey: [`employee-stores`],
        queryFn: async () => {
            const { data } = await getEmployeeStores();
            return data;
        },
    });
};
export const useGetEmployeeReportDetail = (reportId: string) => {
    return useQuery<GetEmployeeReportsContent>({
        queryKey: [`employee-report-detail`, reportId],
        queryFn: async () => {
            const { data } = await getEmployeeReportById(reportId);
            return data;
        },
    });
};
