import { GeneralLayout } from "@/components/shared/GeneralLayout";
import { useAppDispatch, useAppSelector } from "@/redux/utils";
import { sellerLogout } from "@/roles/seller/redux/auth/actions";
import {
    HomeOutlined,
    LogoutOutlined,
    ProductOutlined,
    ProfileOutlined,
    SettingOutlined,
    ShoppingCartOutlined,
    VerticalAlignTopOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface SellerLayoutProps {}
const items: MenuProps["items"] = [
    {
        label: <Link to={"/seller"}>Главная</Link>,
        key: "home",
        icon: <HomeOutlined />,
    },
    {
        label: <Link to={"/seller/settings"}>Настройки</Link>,
        key: "settings",
        icon: <SettingOutlined />,
    },
    {
        label: <Link to={"/seller/orders"}>Заказы</Link>,
        key: "orders",
        icon: <ShoppingCartOutlined />,
    },
    {
        label: <Link to={"/seller/products"}>Продукты</Link>,
        key: "products",
        icon: <ProductOutlined />,
    },
    {
        label: <Link to={"/seller/supply"}>Поставки</Link>,
        key: "supply",
        icon: <VerticalAlignTopOutlined />,
    },
];

function pathToKey(key: string) {
    switch (key) {
        case "/seller":
            return "home";
        case "/seller/settings":
            return "settings";
        case "/seller/products":
            return "products";
        case "/seller/supply":
            return "supply";
        case "/seller/supply/create":
            return "supply";
        case "/seller/orders":
            return "orders";
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
};
export const SellerLayout: FC<SellerLayoutProps> = ({}) => {
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

    const sellerAuth = useAppSelector((state) => state.seller.auth);

    return (
        <GeneralLayout
            breadcrumbItems={breadcrumbMapping}
            menuItems={items}
            profileItems={profileItems}
            logoLink="/seller"
            role="Продавец"
            userEmail={sellerAuth.userData?.email || "email@gmail.com"}
            selectedKeys={selectedKeys}
        />
    );
};
