import { defaultAvatar } from "@/assets";
import { SizesIcon } from "@/assets/custom-icon/CustomIcon";
import { GeneralLayout } from "@/components/shared/GeneralLayout";
import { useAppDispatch, useAppSelector } from "@/redux/utils";
import { employeeLogout } from "@/roles/employee/redux/auth/actions";
import { MenuItemType } from "@/types";
import {
    HomeOutlined,
    LogoutOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
    VerticalAlignTopOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { FC, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation } from "react-router-dom";

interface EmployeeLayoutProps {}

function pathToKey(key: string) {
    switch (key) {
        case "/employee":
            return "home";
        case "/employee/supplies":
            return "supplies";
        case "/employee/scan":
            return "scan";
        case "/employee/orders":
            return "orders";
        case "/employee/search":
            return "search";
        case "/employee/sizes":
            return "sizes";
        default:
            return "home";
    }
}
const breadcrumbMapping: {
    [key: string]: { title: string | JSX.Element }[];
} = {
    "/employee": [{ title: "Меню" }, { title: <a href="">Главная</a> }],
    "/employee/orders": [{ title: "Меню" }, { title: <a href="">Заказы</a> }],
    "/employee/supplies": [
        { title: "Меню" },
        { title: <a href="">Поставки</a> },
    ],
    "/employee/search": [{ title: "Меню" }, { title: <a href="">Поиск</a> }],
    "/employee/sizes": [{ title: "Меню" }, { title: <a href="">Размеры</a> }],
};
export const EmployeeLayout: FC<EmployeeLayoutProps> = ({}) => {
    const isSmallScreen = useMediaQuery({ query: "(max-width: 640px" });

    const items: MenuItemType[] = [
        {
            label: (
                <Link
                    style={{ color: "inherit", textDecoration: "inherit" }}
                    to={"/employee"}
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
                    to={"/employee/orders"}
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
                    to={"/employee/supplies"}
                >
                    Поставки
                </Link>
            ),
            key: "supplies",
            icon: (
                <VerticalAlignTopOutlined
                    style={{ fontSize: isSmallScreen ? "24px" : "14px" }}
                />
            ),
        },

        {
            label: (
                <Link
                    style={{ color: "inherit", textDecoration: "inherit" }}
                    to={"/employee/search"}
                >
                    Поиск
                </Link>
            ),
            key: "search",
            icon: (
                <SearchOutlined
                    style={{ fontSize: isSmallScreen ? "24px" : "14px" }}
                />
            ),
        },
        {
            label: (
                <Link
                    style={{ color: "inherit", textDecoration: "inherit" }}
                    to={"/employee/sizes"}
                >
                    Размеры
                </Link>
            ),
            key: "sizes",
            icon: (
                <SizesIcon
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
                    to={"/employee/login"}
                    onClick={() => {
                        dispatch(employeeLogout());
                    }}
                >
                    Выйти
                </Link>
            ),
            icon: <LogoutOutlined />,
        },
    ];

    const employeeAuth = useAppSelector((state) => state.employee.auth);

    return (
        <GeneralLayout
            menuItems={items}
            profileItems={profileItems}
            breadcrumbItems={breadcrumbMapping}
            logoLink={defaultAvatar}
            role="Сотрудник"
            userEmail={employeeAuth.userData?.email || "WONDER"}
            selectedKeys={selectedKeys}
        />
    );
};
