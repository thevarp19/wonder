import { GeneralLayout } from "@/components/shared/GeneralLayout";
import { useAppDispatch, useAppSelector } from "@/redux/utils";
import { employeeLogout } from "@/roles/employee/redux/auth/actions";
import {
    HomeOutlined,
    LogoutOutlined,
    ProfileOutlined,
    ScanOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface EmployeeLayoutProps {}
const items: MenuProps["items"] = [
    {
        label: <Link to={"/employee"}>Home</Link>,
        key: "home",
        icon: <HomeOutlined />,
    },
    {
        label: <Link to={"/employee/supplies"}>Supplies</Link>,
        key: "supplies",
        icon: <SettingOutlined />,
    },
    {
        label: <Link to={"/employee/scan"}>Scan</Link>,
        key: "scan",
        icon: <ScanOutlined />,
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
            label: "Profile",
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
                    Logout
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
            role="Employee"
            userEmail={employeeAuth.userData?.email || "email@gmail.com"}
            selectedKeys={selectedKeys}
        />
    );
};
