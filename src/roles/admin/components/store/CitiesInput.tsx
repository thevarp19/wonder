import { useQuery } from "@tanstack/react-query";
import { Select, SelectProps } from "antd";
import { FC } from "react";
import { getCities } from "../../api/shared";

export const KazakhstanCities = [
    { label: "Almaty", value: "Almaty" },
    { label: "Astana", value: "Astana" },
    { label: "Shymkent", value: "Shymkent" },
    { label: "Qaraghandy", value: "Qaraghandy" },
    { label: "Aqtöbe", value: "Aqtöbe" },
    { label: "Taraz", value: "Taraz" },
    { label: "Pavlodar", value: "Pavlodar" },
    { label: "Semey", value: "Semey" },
    { label: "Öskemen", value: "Öskemen" },
    { label: "Atyraū", value: "Atyraū" },
    { label: "Qyzylorda", value: "Qyzylorda" },
    { label: "Oral", value: "Oral" },
    { label: "Qostanay", value: "Qostanay" },
    { label: "Qaskelen", value: "Qaskelen" },
    { label: "Kokshetau", value: "Kokshetau" },
    { label: "Aqtau", value: "Aqtau" },
    { label: "Petropavl", value: "Petropavl" },
    { label: "Turkistan", value: "Turkistan" },
    { label: "Taldyqorgan", value: "Taldyqorgan" },
];

interface CitiesInputProps extends SelectProps {}

export const CitiesInput: FC<CitiesInputProps> = ({ ...props }) => {
    const { data: options } = useQuery({
        queryKey: ["cities"],
        queryFn: async () => {
            const { data } = await getCities();
            return data.map((city) => ({ label: city.name, value: city.id }));
        },
    });

    return (
        <Select
            placeholder={"City"}
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
