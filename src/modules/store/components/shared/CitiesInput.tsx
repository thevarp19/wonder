import { axiosAuthorized } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Select, SelectProps } from "antd";
import { FC } from "react";

interface CitiesInputProps extends SelectProps {}

export const CitiesInput: FC<CitiesInputProps> = ({ ...props }) => {
    const { data: options } = useQuery({
        queryKey: ["cities"],
        queryFn: async () => {
            const { data } = await axiosAuthorized.get<
                {
                    id: string;
                    name: string;
                }[]
            >("/api/cities");
            return data.map((city) => ({ label: city.name, value: city.id }));
        },
    });

    return (
        <Select
            placeholder={"Город"}
            options={options}
            showSearch
            filterOption={(input, option) =>
                !!option?.label
                    ?.toString()
                    .toLowerCase()
                    .includes(input.toLowerCase())
            }
            {...props}
        />
    );
};
