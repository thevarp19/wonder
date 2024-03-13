import { GeneralLayout } from "@/components/shared/GeneralLayout";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface SellerLayoutProps {}
const items: MenuProps["items"] = [
    {
        label: <Link to={"/seller"}>Home</Link>,
        key: "home",
        icon: <HomeOutlined />,
    },
    {
        label: <Link to={"/seller/settings"}>Settings</Link>,
        key: "settings",
        icon: <SettingOutlined />,
    },
];

function pathToKey(key: string) {
    switch (key) {
        case "/seller":
            return "home";
        case "/seller/settings":
            return "settings";
        default:
            return "home";
    }
}

export const SellerLayout: FC<SellerLayoutProps> = ({}) => {
    const { pathname } = useLocation();
    const [selectedKeys, setSelectedKeys] = useState([pathToKey(pathname)]);
    useEffect(() => {
        setSelectedKeys([pathToKey(pathname)]);
    }, [pathname]);
    return (
        <GeneralLayout
            menuItems={items}
            logoLink="/seller"
            role="Seller"
            userEmail="email@gmail.com"
            selectedKeys={selectedKeys}
        />
    );
};
