import { MenuProps } from "antd";
import { AssembleDeliveryMode, DeliveryMode } from "./types";

export const items: MenuProps["items"] = [
    {
        label: "Все",
        key: "all",
    },
    {
        label: "Заммлер",
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

export const assembleDeliveryModes: { [key: string]: AssembleDeliveryMode } = {
    zamler: "ZAMLER",
    express: "EXPRESS",
    pickup: "PICKUP",
};
