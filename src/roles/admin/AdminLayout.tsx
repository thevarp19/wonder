import { GeneralLayout } from "@/components/shared/GeneralLayout";
import { useAppDispatch, useAppSelector } from "@/redux/utils";
import { adminLogout } from "@/roles/admin/redux/auth/actions";
import { MenuItemType } from "@/types";
import {
    HomeOutlined,
    LogoutOutlined,
    ProfileOutlined,
    SettingOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { FC, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation } from "react-router-dom";

interface AdminLayoutProps {}

const breadcrumbMapping: {
    [key: string]: { title: string | JSX.Element }[];
} = {
    "/admin": [{ title: "Меню" }, { title: <a href="">Главная</a> }],
    "/admin/orders": [{ title: "Меню" }, { title: <a href="">Заказы</a> }],
    "/admin/settings": [{ title: "Меню" }, { title: <a href="">Настройки</a> }],
};
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
    const isSmallScreen = useMediaQuery({ query: "(max-width: 640px" });
    const items: MenuItemType[] = [
        {
            label: (
                <Link
                    style={{ color: "inherit", textDecoration: "inherit" }}
                    to={"/admin"}
                >
                    Главная
                </Link>
            ),
            key: "home",
            icon: (
                <HomeOutlined
                    style={{ fontSize: isSmallScreen ? "24px" : "14px" }}
                />
            ),
        },
        {
            label: (
                <Link
                    style={{ color: "inherit", textDecoration: "inherit" }}
                    to={"/admin/orders"}
                >
                    Заказы
                </Link>
            ),
            key: "orders",
            icon: (
                <ShoppingCartOutlined
                    style={{ fontSize: isSmallScreen ? "24px" : "14px" }}
                />
            ),
        },
        {
            label: (
                <Link
                    style={{ color: "inherit", textDecoration: "inherit" }}
                    to={"/admin/settings"}
                >
                    Настройки
                </Link>
            ),
            key: "settings",
            icon: (
                <SettingOutlined
                    style={{ fontSize: isSmallScreen ? "24px" : "14px" }}
                />
            ),
        },
    ];
    const { pathname } = useLocation();
    const [selectedKeys, setSelectedKeys] = useState([pathToKey(pathname)]);
    useEffect(() => {
        setSelectedKeys([pathToKey(pathname)]);
    }, [pathname]);
    const dispatch = useAppDispatch();
    const profileItems: MenuProps["items"] = [
        {
            key: "profile",
            label: "Профиль",
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
                    Выйти
                </Link>
            ),
            icon: <LogoutOutlined />,
        },
    ];

    const adminAuth = useAppSelector((state) => state.admin.auth);

    return (
        <GeneralLayout
            menuItems={items}
            breadcrumbItems={breadcrumbMapping}
            profileItems={profileItems}
            logoLink="/admin"
            role="Администратор"
            userEmail={adminAuth.userData?.email || "email@gmail.com"}
            selectedKeys={selectedKeys}
        />
    );
};
