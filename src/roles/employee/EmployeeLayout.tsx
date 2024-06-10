import { GeneralLayout } from "@/components/shared/GeneralLayout";
import { useAppDispatch, useAppSelector } from "@/redux/utils";
import { employeeLogout } from "@/roles/employee/redux/auth/actions";
import {
    CarOutlined,
    HomeOutlined,
    LineHeightOutlined,
    LogoutOutlined,
    ProfileOutlined,
    SearchOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface EmployeeLayoutProps {}
const items: MenuProps["items"] = [
    {
        label: <Link to={"/employee"}>Главная</Link>,
        key: "home",
        icon: <HomeOutlined />,
    },
    {
        label: <Link to={"/employee/supplies"}>Поставки</Link>,
        key: "supplies",
        icon: <SettingOutlined />,
    },
    {
        label: <Link to={"/employee/orders"}>Заказы</Link>,
        key: "orders",
        icon: <CarOutlined />,
    },
    {
        label: <Link to={"/employee/search"}>Поиск</Link>,
        key: "search",
        icon: <SearchOutlined />,
    },
    {
        label: <Link to={"/employee/sizes"}>Размеры</Link>,
        key: "sizes",
        icon: <LineHeightOutlined />,
    },
];

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

export const EmployeeLayout: FC<EmployeeLayoutProps> = ({}) => {
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
            logoLink="/employee"
            role="Сотрудник"
            userEmail={employeeAuth.userData?.email || "email@gmail.com"}
            selectedKeys={selectedKeys}
        />
    );
};
