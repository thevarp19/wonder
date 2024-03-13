import { Select, SelectProps } from "antd";
import { FC } from "react";

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
    return (
        <Select placeholder={"City"} options={KazakhstanCities} {...props} />
    );
};
