import { defaultAvatar } from "@/assets";
import { SizesIcon } from "@/assets/custom-icon/CustomIcon";
import { GeneralLayout } from "@/components/shared/GeneralLayout";
import { useAppDispatch, useAppSelector } from "@/redux/utils";
import { employeeLogout } from "@/roles/employee/redux/auth/actions";
import { MenuItemType } from "@/types";
import {
    AppstoreAddOutlined,
    AuditOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    DatabaseOutlined,
    FileOutlined,
    FileTextOutlined,
    HistoryOutlined,
    HomeOutlined,
    LogoutOutlined,
    MergeCellsOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
    ThunderboltOutlined,
    TruckOutlined,
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
        case "/employee/refunds":
            return "refunds";
        case "/employee/reports":
            return "reports";
        case "/employee/orders":
            return "orders";
        case "/employee/orders/new":
            return "orders-new";
        case "/employee/orders/signing":
            return "orders-signing";
        case "/employee/orders/archive":
            return "orders-archive";
        case "/employee/orders/assemble":
            return "order-assemble";
        case "/employee/orders/package":
            return "order-package";
        case "/employee/orders/transfer":
            return "order-transfer";
        case "/employee/orders/shipped":
            return "order-shipped";
        case "/employee/orders/cancelled":
            return "order-cancelled";
        case "/employee/search":
            return "search";
        case "/employee/placement":
            return "placement";
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
    "/employee/orders/assemble": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Сборка</a> },
    ],
    "/employee/orders/package": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Упаковка</a> },
    ],
    "/employee/orders/transfer": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Передача</a> },
    ],
    "/employee/orders/shipped": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Отправлено</a> },
    ],
    "/employee/orders/cancelled": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Отменено</a> },
    ],
    "/employee/orders/new": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Новый</a> },
    ],
    "/employee/orders/signing": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Подписание</a> },
    ],
    "/employee/orders/archive": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Архив</a> },
    ],
    "/employee/supplies": [
        { title: "Меню" },
        { title: <a href="">Поставки</a> },
    ],
    "/employee/search": [{ title: "Меню" }, { title: <a href="">Поиск</a> }],
    "/employee/sizes": [{ title: "Меню" }, { title: <a href="">Размеры</a> }],
    "/employee/reports": [
        { title: "Меню" },
        { title: <a href="">Накладные</a> },
    ],
    "/employee/refunds": [
        { title: "Меню" },
        { title: <a href="">Возвраты</a> },
    ],
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
                    to={"/employee/orders/new"}
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
                    to={"/employee/orders/signing"}
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
                    to={"/employee/orders"}
                >
                    Заказы
                </Link>
            ),
            key: "orders",
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
                            to={"/employee/orders/assemble"}
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
                            to={"/employee/orders/package"}
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
                            to={"/employee/orders/transfer"}
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
                            to={"/employee/orders/shipped"}
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
                            to={"/employee/orders/cancelled"}
                        >
                            Отменено
                        </Link>
                    ),
                },
            ],
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
                    to={"/employee/orders/archive"}
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
                    to={"/employee/reports"}
                >
                    Накладные
                </Link>
            ),
            key: "reports",
            icon: (
                <FileTextOutlined
                    style={{ fontSize: isSmallScreen ? "24px" : "14px" }}
                />
            ),
        },
        {
            label: (
                <Link
                    style={{ color: "inherit", textDecoration: "inherit" }}
                    to={"/employee/refunds"}
                >
                    Возвраты
                </Link>
            ),
            key: "refunds",
            icon: (
                <MergeCellsOutlined
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
                    Приемка
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
                    to={"/employee/placement"}
                    target="_blank"
                >
                    Размещение
                </Link>
            ),
            key: "placement",
            icon: (
                <DatabaseOutlined
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
