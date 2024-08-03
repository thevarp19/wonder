import { MenuProps } from "antd";
import { DeliveryMode } from "./types";

export const items: MenuProps["items"] = [
    {
        label: "Все",
        key: "all",
    },
    {
        label: "Замлер",
        key: "zamler",
    },
    {
        label: "Express",
        key: "express",
    },
    {
        label: "Самовывоз",
        key: "pickup",
    },
];
export const deliveryModes: { [key: string]: DeliveryMode } = {
    all: "ALL",
    zamler: "ZAMLER",
    express: "EXPRESS",
    pickup: "PICKUP",
    archive: "ARCHIVE",
};
