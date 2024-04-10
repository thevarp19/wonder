import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { createSupply } from "./api";
import { CreateSupplyRequest } from "./types";

export const createSupplyMutation = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();

    return useMutation<{ id: string }, AxiosError<any>, CreateSupplyRequest>({
        async mutationFn(values) {
            const { data } = await createSupply(values);
            return data;
        },
        onSuccess() {
            message.success("Success!");
            navigate("/seller/supply/");
        },
        onError(error) {
            message.error(`${error?.response?.data.message}`);
        },
    });
};
