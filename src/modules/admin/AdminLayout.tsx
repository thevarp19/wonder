import { GeneralLayout } from "@/components/shared/GeneralLayout";
import { MenuProps } from "antd";
import { FC } from "react";

interface AdminLayoutProps {}
const items: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
    key,
    label: `nav ${key}`,
}));
export const AdminLayout: FC<AdminLayoutProps> = ({}) => {
    return (
        <GeneralLayout
            menuItems={items}
            logoLink="/admin"
            role="Admin"
            userEmail="email@gmail.com"
        />
    );
};
