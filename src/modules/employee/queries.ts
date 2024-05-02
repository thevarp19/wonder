import { useQuery } from "@tanstack/react-query";
import { getEmployeeById, getEmployees } from "./api";
import { GetEmployee } from "./types";

export const useGetEmployees = (storeId: number) => {
    return useQuery<GetEmployee[]>({
        queryKey: [`employees-${storeId}`, `employees`],
        queryFn: async () => {
            const { data } = await getEmployees(storeId);
            return data;
        },
    });
};

export const useGetEmployeeById = (userId: number) => {
    return useQuery<GetEmployee>({
        queryKey: [`employee-${userId}`],
        queryFn: async () => {
            const { data } = await getEmployeeById(userId);
            return data;
        },
    });
};
