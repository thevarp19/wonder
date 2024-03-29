import { useMutation } from "@tanstack/react-query";
import { App } from "antd";
import { useNavigate } from "react-router-dom";
import { createBox } from "./api";

export const useCreateBox = () => {
    const { message } = App.useApp();
    const navigate = useNavigate();
    return useMutation<
        void,
        void,
        {
            name: string;
            height: number;
            width: number;
            length: number;
            files: any[];
        }
    >({
        async mutationFn(values) {
            const formData = new FormData();
            formData.append("name", values.name);
            const { height, width, length } = values;
            formData.append("description", `${height}x${width}x${length}`);
            values.files.forEach((file) => {
                formData.append("images", file);
            });
            await createBox(formData);
        },
        onSuccess() {
            message.success("Success!");
            navigate("/admin/settings/?menu_x=boxes");
        },
        onError() {
            message.error("Error!");
        },
    });
};
