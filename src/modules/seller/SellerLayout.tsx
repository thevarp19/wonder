import { GeneralLayout } from "@/components/shared/GeneralLayout";
import { MenuProps } from "antd";
import { FC } from "react";

interface SellerLayoutProps {}
const items: MenuProps["items"] = ["1", "2", "3"].map((key) => ({
    key,
    label: `nav ${key}`,
}));
export const SellerLayout: FC<SellerLayoutProps> = ({}) => {
    return (
        <GeneralLayout
            menuItems={items}
            logoLink="/seller"
            role="Seller"
            userEmail="email@gmail.com"
        />
    );
};
