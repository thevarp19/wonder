import { GeneralLayout } from "@/components/shared/GeneralLayout";
import { useAppDispatch, useAppSelector } from "@/redux/utils";
import { adminLogout } from "@/roles/admin/redux/auth/actions";
import {
    CarOutlined,
    HomeOutlined,
    LogoutOutlined,
    ProfileOutlined,
    SettingOutlined,
} from "@ant-design/icons";
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
        label: <Link to={"/admin/orders"}>Orders</Link>,
        key: "orders",
        icon: <CarOutlined />,
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
        case "/admin/orders":
            return "orders";
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
    const dispatch = useAppDispatch();
    const profileItems: MenuProps["items"] = [
        {
            key: "profile",
            label: "Profile",
            icon: <ProfileOutlined />,
        },
        {
            key: "logout",
            danger: true,
            label: (
                <Link
                    to={"/admin/login"}
                    onClick={() => {
                        dispatch(adminLogout());
                    }}
                >
                    Logout
                </Link>
            ),
            icon: <LogoutOutlined />,
        },
    ];

    const adminAuth = useAppSelector((state) => state.admin.auth);

    return (
        <GeneralLayout
            menuItems={items}
            profileItems={profileItems}
            logoLink="/admin"
            role="Admin"
            userEmail={adminAuth.userData?.email || "email@gmail.com"}
            selectedKeys={selectedKeys}
        />
    );
};
