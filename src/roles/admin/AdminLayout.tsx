import { defaultAvatar } from "@/assets";
import { GeneralLayout } from "@/components/shared/GeneralLayout";
import { useAppDispatch, useAppSelector } from "@/redux/utils";
import { adminLogout } from "@/roles/admin/redux/auth/actions";
import { MenuItemType } from "@/types";
import {
    AppstoreAddOutlined,
    AuditOutlined,
    BankOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    FileOutlined,
    HistoryOutlined,
    HomeOutlined,
    LogoutOutlined,
    SettingOutlined,
    ShoppingCartOutlined,
    ThunderboltOutlined,
    TruckOutlined,
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
    "/admin/orders/assemble": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Сборка</a> },
    ],
    "/admin/orders/package": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Упаковка</a> },
    ],
    "/admin/orders/transfer": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Передача</a> },
    ],
    "/admin/orders/shipped": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Отправлено</a> },
    ],
    "/admin/orders/cancelled": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Отменено</a> },
    ],
    "/admin/orders/new": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Новый</a> },
    ],
    "/admin/orders/signing": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Подписание</a> },
    ],
    "/admin/orders/archive": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Архив</a> },
    ],
    "/admin/balance": [{ title: "Меню" }, { title: <a href="">Баланс</a> }],
};
function pathToKey(key: string) {
    if (key.startsWith("/admin/settings/")) {
        return "settings";
    }
    switch (key) {
        case "/admin":
            return "home";
        case "/admin/settings":
            return "settings";
        case "/admin/orders":
            return "orders";
        case "/admin/balance":
            return "balance";
        case "/admin/orders/new":
            return "orders-new";
        case "/admin/orders/signing":
            return "orders-signing";
        case "/admin/orders/archive":
            return "orders-archive";
        case "/admin/orders/assemble":
            return "order-assemble";
        case "/admin/orders/package":
            return "order-package";
        case "/admin/orders/transfer":
            return "order-transfer";
        case "/admin/orders/shipped":
            return "order-shipped";
        case "/admin/orders/cancelled":
            return "order-cancelled";
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
                    to={"/admin/balance"}
                >
                    Баланс
                </Link>
            ),
            key: "balance",
            icon: (
                <BankOutlined
                    style={{ fontSize: isSmallScreen ? "24px" : "14px" }}
                />
            ),
        },
        {
            label: (
                <Link
                    style={{ color: "inherit", textDecoration: "inherit" }}
                    to={"/admin/orders/new"}
                >
                    Новые
                </Link>
            ),
            key: "orders-new",
            icon: (
                <ThunderboltOutlined
                    style={{ fontSize: isSmallScreen ? "24px" : "14px" }}
                />
            ),
        },
        {
            label: (
                <Link
                    style={{ color: "inherit", textDecoration: "inherit" }}
                    to={"/admin/orders/signing"}
                >
                    На подписании
                </Link>
            ),
            key: "orders-signing",
            icon: (
                <FileOutlined
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
            children: [
                {
                    key: "order-assemble",
                    icon: (
                        <AppstoreAddOutlined
                            style={{
                                fontSize: isSmallScreen ? "24px" : "14px",
                            }}
                        />
                    ),
                    label: (
                        <Link
                            style={{
                                color: "inherit",
                                textDecoration: "inherit",
                            }}
                            to={"/admin/orders/assemble"}
                        >
                            Сборка
                        </Link>
                    ),
                },
                {
                    key: "order-package",
                    icon: (
                        <AuditOutlined
                            style={{
                                fontSize: isSmallScreen ? "24px" : "14px",
                            }}
                        />
                    ),
                    label: (
                        <Link
                            style={{
                                color: "inherit",
                                textDecoration: "inherit",
                            }}
                            to={"/admin/orders/package"}
                        >
                            Упаковка
                        </Link>
                    ),
                },
                {
                    key: "order-transfer",
                    icon: (
                        <TruckOutlined
                            style={{
                                fontSize: isSmallScreen ? "24px" : "14px",
                            }}
                        />
                    ),
                    label: (
                        <Link
                            style={{
                                color: "inherit",
                                textDecoration: "inherit",
                            }}
                            to={"/admin/orders/transfer"}
                        >
                            Передача
                        </Link>
                    ),
                },
                {
                    key: "order-shipped",
                    icon: (
                        <CheckCircleOutlined
                            style={{
                                fontSize: isSmallScreen ? "24px" : "14px",
                            }}
                        />
                    ),
                    label: (
                        <Link
                            style={{
                                color: "inherit",
                                textDecoration: "inherit",
                            }}
                            to={"/admin/orders/shipped"}
                        >
                            Отправлено
                        </Link>
                    ),
                },
                {
                    key: "order-cancelled",
                    icon: (
                        <CloseCircleOutlined
                            style={{
                                fontSize: isSmallScreen ? "24px" : "14px",
                            }}
                        />
                    ),
                    label: (
                        <Link
                            style={{
                                color: "inherit",
                                textDecoration: "inherit",
                            }}
                            to={"/admin/orders/cancelled"}
                        >
                            Отменено
                        </Link>
                    ),
                },
            ],
        },
        {
            label: (
                <Link
                    style={{ color: "inherit", textDecoration: "inherit" }}
                    to={"/admin/orders/archive"}
                >
                    Архив
                </Link>
            ),
            key: "orders-archive",
            icon: (
                <HistoryOutlined
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
            logoLink={defaultAvatar}
            role="Администратор"
            userEmail={adminAuth.userData?.email || "WONDER"}
            selectedKeys={selectedKeys}
        />
    );
};
