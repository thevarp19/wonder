import { GeneralLayout } from "@/components/shared/GeneralLayout";
import { useGetSellerProfile } from "@/modules/seller/queries";
import { useAppDispatch } from "@/redux/utils";
import { sellerLogout } from "@/roles/seller/redux/auth/actions";
import { MenuItemType } from "@/types";
import {
    AppstoreAddOutlined,
    AuditOutlined,
    BankOutlined,
    CalculatorOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    FileOutlined,
    HistoryOutlined,
    HomeOutlined,
    LogoutOutlined,
    ProductOutlined,
    ProfileOutlined,
    SettingOutlined,
    ShoppingCartOutlined,
    ThunderboltOutlined,
    TruckOutlined,
    VerticalAlignTopOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { FC, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useLocation } from "react-router-dom";

interface SellerLayoutProps {}

function pathToKey(key: string) {
    if (key.startsWith("/settings/")) {
        return "settings";
    }
    switch (key) {
        case "":
            return "home";
        case "/settings":
            return "settings";
        case "/products":
            return "products";
        case "/supply":
            return "supply";
        case "/service-params":
            return "service-params";
        case "/calculator":
            return "calculator";
        case "/supply/create":
            return "supply";
        case "/orders":
            return "orders";
        case "/balance":
            return "balance";
        case "/my-orders":
            return "my-orders";
        case "/my-orders/pickup":
            return "my-orders-pickup";
        case "/orders/new":
            return "orders-new";
        case "/orders/signing":
            return "orders-signing";
        case "/orders/archive":
            return "orders-archive";
        case "/orders/assemble":
            return "order-assemble";
        case "/orders/package":
            return "order-package";
        case "/orders/transfer":
            return "order-transfer";
        case "/orders/shipped":
            return "order-shipped";
        case "/orders/cancelled":
            return "order-cancelled";
        default:
            return "home";
    }
}
const breadcrumbMapping: {
    [key: string]: { title: string | JSX.Element }[];
} = {
    "": [{ title: "Меню" }, { title: <a href="">Главная</a> }],
    "/settings": [
        { title: "Меню" },
        { title: <a href="/settings">Настройки</a> },
    ],
    "/orders": [{ title: "Меню" }, { title: <a href="/orders">Заказы</a> }],
    "/products": [
        { title: "Меню" },
        { title: <a href="/products">Продукты</a> },
    ],
    "/supply": [{ title: "Меню" }, { title: <a href="/supply">Поставки</a> }],
    "/calculator": [
        { title: "Меню" },
        { title: <a href="/calculator">Калькулятор</a> },
    ],
    "/service-params": [
        { title: "Меню" },
        { title: <a href="/service-params">Параметры услуг</a> },
    ],
    "/orders/assemble": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Сборка</a> },
    ],
    "/orders/package": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Упаковка</a> },
    ],
    "/orders/transfer": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Передача</a> },
    ],
    "/orders/shipped": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Отправлено</a> },
    ],
    "/orders/cancelled": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Отменено</a> },
    ],
    "/orders/new": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Новый</a> },
    ],
    "/orders/signing": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Подписание</a> },
    ],
    "/orders/archive": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Архив</a> },
    ],
    "/balance": [{ title: "Меню" }, { title: <a href="">Баланс</a> }],
};
export const SellerLayout: FC<SellerLayoutProps> = ({}) => {
    const isSmallScreen = useMediaQuery({ query: "(max-width: 640px" });

    const items: MenuItemType[] = [
        {
            label: (
                <Link
                    style={{ color: "inherit", textDecoration: "inherit" }}
                    to={"/"}
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
                    to={"/balance"}
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
                    to={"/orders/new"}
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
                    to={"/orders/signing"}
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
                    to={"/orders"}
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
                            to={"/orders/assemble"}
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
                            to={"/orders/package"}
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
                            to={"/orders/transfer"}
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
                            to={"/orders/shipped"}
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
                            to={"/orders/cancelled"}
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
                    to={"/my-orders"}
                >
                    Мои Заказы
                </Link>
            ),
            key: "my-orders",
            icon: (
                <ShoppingCartOutlined
                    style={{ fontSize: isSmallScreen ? "24px" : "14px" }}
                />
            ),
            children: [
                {
                    key: "my-order-package",
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
                            to={"/my-orders/package"}
                        >
                            Упаковка
                        </Link>
                    ),
                },
                {
                    key: "my-order-transfer",
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
                            to={"/my-orders/transfer"}
                        >
                            Передача
                        </Link>
                    ),
                },
                {
                    key: "my-order-shipped",
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
                            to={"/my-orders/shipped"}
                        >
                            Отправлено
                        </Link>
                    ),
                },
                {
                    key: "my-order-cancelled",
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
                            to={"/my-orders/cancelled"}
                        >
                            Отменено
                        </Link>
                    ),
                },
                {
                    key: "my-order-pickup",
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
                            to={"/my-orders/pickup"}
                        >
                            Самовывоз
                        </Link>
                    ),
                },
            ],
        },
        {
            label: (
                <Link
                    style={{ color: "inherit", textDecoration: "inherit" }}
                    to={"/orders/archive"}
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
                    to={"/products"}
                >
                    Товары
                </Link>
            ),
            key: "products",
            icon: (
                <ProductOutlined
                    style={{ fontSize: isSmallScreen ? "24px" : "14px" }}
                />
            ),
        },

        {
            label: (
                <Link
                    style={{ color: "inherit", textDecoration: "inherit" }}
                    to={"/supply"}
                >
                    Поставки
                </Link>
            ),
            key: "supply",
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
                    to={"calculator"}
                >
                    Калькулятор
                </Link>
            ),
            key: "calculator",
            icon: (
                <CalculatorOutlined
                    style={{ fontSize: isSmallScreen ? "24px" : "14px" }}
                />
            ),
        },
        {
            label: (
                <Link
                    style={{ color: "inherit", textDecoration: "inherit" }}
                    to={"/settings"}
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
        {
            label: (
                <Link
                    style={{ color: "inherit", textDecoration: "inherit" }}
                    to={"/service-params"}
                >
                    Параметры услуг
                </Link>
            ),
            key: "service-params",
            icon: (
                <ProductOutlined
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
            label: <Link to={"/profile"}>Профиль</Link>,
            icon: <ProfileOutlined />,
        },
        {
            key: "logout",
            danger: true,
            label: (
                <Link
                    to={"/login"}
                    onClick={() => {
                        dispatch(sellerLogout());
                    }}
                >
                    Выйти
                </Link>
            ),
            icon: <LogoutOutlined />,
        },
    ];

    // const sellerAuth = useAppSelector((state) => state.seller.auth);
    const { data, isPending } = useGetSellerProfile();
    return (
        <GeneralLayout
            breadcrumbItems={breadcrumbMapping}
            menuItems={items}
            isPending={isPending}
            profileItems={profileItems}
            logoLink={data?.avatar || ""}
            role="Продавец"
            userEmail={data?.kaspi_store_name}
            balance={data?.balance}
            selectedKeys={selectedKeys}
        />
    );
};
