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
    if (key.startsWith("/seller/settings/")) {
        return "settings";
    }
    switch (key) {
        case "/seller":
            return "home";
        case "/seller/settings":
            return "settings";
        case "/seller/products":
            return "products";
        case "/seller/supply":
            return "supply";
        case "/seller/service-params":
            return "service-params";
        case "/seller/calculator":
            return "calculator";
        case "/seller/supply/create":
            return "supply";
        case "/seller/orders":
            return "orders";
        case "/seller/balance":
            return "balance";
        case "/seller/my-orders":
            return "my-orders";
        case "/seller/my-orders/pickup":
            return "my-orders-pickup";
        case "/seller/orders/new":
            return "orders-new";
        case "/seller/orders/signing":
            return "orders-signing";
        case "/seller/orders/archive":
            return "orders-archive";
        case "/seller/orders/assemble":
            return "order-assemble";
        case "/seller/orders/package":
            return "order-package";
        case "/seller/orders/transfer":
            return "order-transfer";
        case "/seller/orders/shipped":
            return "order-shipped";
        case "/seller/orders/cancelled":
            return "order-cancelled";
        default:
            return "home";
    }
}
const breadcrumbMapping: {
    [key: string]: { title: string | JSX.Element }[];
} = {
    "/seller": [{ title: "Меню" }, { title: <a href="/seller">Главная</a> }],
    "/seller/settings": [
        { title: "Меню" },
        { title: <a href="/seller/settings">Настройки</a> },
    ],
    "/seller/orders": [
        { title: "Меню" },
        { title: <a href="/seller/orders">Заказы</a> },
    ],
    "/seller/products": [
        { title: "Меню" },
        { title: <a href="/seller/products">Продукты</a> },
    ],
    "/seller/supply": [
        { title: "Меню" },
        { title: <a href="/seller/supply">Поставки</a> },
    ],
    "/seller/calculator": [
        { title: "Меню" },
        { title: <a href="/seller/calculator">Калькулятор</a> },
    ],
    "/seller/service-params": [
        { title: "Меню" },
        { title: <a href="/seller/service-params">Параметры услуг</a> },
    ],
    "/seller/orders/assemble": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Сборка</a> },
    ],
    "/seller/orders/package": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Упаковка</a> },
    ],
    "/seller/orders/transfer": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Передача</a> },
    ],
    "/seller/orders/shipped": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Отправлено</a> },
    ],
    "/seller/orders/cancelled": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Отменено</a> },
    ],
    "/seller/orders/new": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Новый</a> },
    ],
    "/seller/orders/signing": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Подписание</a> },
    ],
    "/seller/orders/archive": [
        { title: "Меню" },
        { title: <a href="">Заказы</a> },
        { title: <a href="">Архив</a> },
    ],
    "/seller/balance": [{ title: "Меню" }, { title: <a href="">Баланс</a> }],
};
export const SellerLayout: FC<SellerLayoutProps> = ({}) => {
    const isSmallScreen = useMediaQuery({ query: "(max-width: 640px" });

    const items: MenuItemType[] = [
        {
            label: (
                <Link
                    style={{ color: "inherit", textDecoration: "inherit" }}
                    to={"/seller"}
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
                    to={"/seller/balance"}
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
                    to={"/seller/orders/new"}
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
                    to={"/seller/orders/signing"}
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
                    to={"/seller/orders"}
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
                            to={"/seller/orders/assemble"}
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
                            to={"/seller/orders/package"}
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
                            to={"/seller/orders/transfer"}
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
                            to={"/seller/orders/shipped"}
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
                            to={"/seller/orders/cancelled"}
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
                    to={"/seller/my-orders"}
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
                            to={"/seller/my-orders/package"}
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
                            to={"/seller/my-orders/transfer"}
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
                            to={"/seller/my-orders/shipped"}
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
                            to={"/seller/my-orders/cancelled"}
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
                            to={"/seller/my-orders/pickup"}
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
                    to={"/seller/products"}
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
                    to={"/seller/supply"}
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
                    to={"/seller/settings"}
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
                    to={"/seller/service-params"}
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
        {
            label: (
                <Link
                    style={{ color: "inherit", textDecoration: "inherit" }}
                    to={"/seller/orders/archive"}
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
            label: <Link to={"/seller/profile"}>Профиль</Link>,
            icon: <ProfileOutlined />,
        },
        {
            key: "logout",
            danger: true,
            label: (
                <Link
                    to={"/"}
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
