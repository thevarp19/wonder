import { GeneralLayout } from "@/components/shared/GeneralLayout";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface AdminLayoutProps {}
const items: MenuProps["items"] = [
    {
        label: <Link to={"/admin"}>Home</Link>,
        key: "home",
        icon: <HomeOutlined />,
    },
    {
        label: <Link to={"/admin/settings"}>Settings</Link>,
        key: "settings",
        icon: <SettingOutlined />,
    },
];

function pathToKey(key: string) {
    switch (key) {
        case "/admin":
            return "home";
        case "/admin/settings":
            return "settings";
        default:
            return "home";
    }
}

export const AdminLayout: FC<AdminLayoutProps> = ({}) => {
    const { pathname } = useLocation();
    const [selectedKeys, setSelectedKeys] = useState([pathToKey(pathname)]);
    useEffect(() => {
        setSelectedKeys([pathToKey(pathname)]);
    }, [pathname]);
    return (
        <GeneralLayout
            menuItems={items}
            logoLink="/admin"
            role="Admin"
            userEmail="email@gmail.com"
            selectedKeys={selectedKeys}
        />
    );
};
