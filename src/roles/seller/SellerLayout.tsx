import { GeneralLayout } from "@/components/shared/GeneralLayout";
import { useAppDispatch, useAppSelector } from "@/redux/utils";
import { sellerLogout } from "@/roles/seller/redux/auth/actions";
import {
    CarOutlined,
    HomeOutlined,
    LineHeightOutlined,
    LogoutOutlined,
    NodeCollapseOutlined,
    ProductOutlined,
    ProfileOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface SellerLayoutProps {}
const items: MenuProps["items"] = [
    {
        label: <Link to={"/seller"}>Home</Link>,
        key: "home",
        icon: <HomeOutlined />,
    },
    {
        label: <Link to={"/seller/settings"}>Settings</Link>,
        key: "settings",
        icon: <SettingOutlined />,
    },
    {
        label: <Link to={"/seller/orders"}>Orders</Link>,
        key: "orders",
        icon: <CarOutlined />,
    },
    {
        label: <Link to={"/seller/products"}>Products</Link>,
        key: "products",
        icon: <ProductOutlined />,
    },
    {
        label: <Link to={"/seller/supply"}>Supply</Link>,
        key: "supply",
        icon: <NodeCollapseOutlined />,
    },
    {
        label: <Link to={"/seller/sizes"}>Sizes</Link>,
        key: "sizes",
        icon: <LineHeightOutlined />,
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
        case "/seller/sizes":
            return "sizes";
        default:
            return "home";
    }
}

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
            label: <Link to={"/seller/profile"}>Profile</Link>,
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
                    Logout
                </Link>
            ),
            icon: <LogoutOutlined />,
        },
    ];

    const sellerAuth = useAppSelector((state) => state.seller.auth);

    return (
        <GeneralLayout
            menuItems={items}
            profileItems={profileItems}
            logoLink="/seller"
            role="Seller"
            userEmail={sellerAuth.userData?.email || "email@gmail.com"}
            selectedKeys={selectedKeys}
        />
    );
};
