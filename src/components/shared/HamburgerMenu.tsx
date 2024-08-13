import { arrowLeftIcon, hamburgerIcon, logo, searchIcon } from "@/assets";
import { MenuItemType } from "@/types";
import { cn } from "@/utils/shared.util";
import { CaretDownOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "../ui/Image";

interface HamburgerMenuProps {
    menuItems: MenuItemType[];
    userEmail: string;
    logoLink?: string;
    role?: "Администратор" | "Продавец" | "Сотрудник";
}
export const HamburgerMenu: FC<HamburgerMenuProps> = ({
    menuItems,
    userEmail,
    logoLink,
    role,
}) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>(
        {}
    );

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
        // setOpenSubmenus({});
    };

    const toggleSubmenu = (key: string) => {
        setOpenSubmenus((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <>
            <div className="md:hidden fixed w-full h-[45px] px-4 py-[6px] bg-white z-50">
                <div className="relative flex items-center justify-center w-full h-full">
                    <div className="absolute top-0 left-0">
                        <Image
                            src={hamburgerIcon}
                            alt="hamburger"
                            className={cn("w-[32px] h-[32px]")}
                            onClick={toggleSidebar}
                        />
                    </div>
                    <Link
                        to="/"
                        className="flex justify-center md:justify-start"
                    >
                        <Image
                            src={logo}
                            alt="logo"
                            className={cn("w-[108px] h-[24px]")}
                        />
                    </Link>
                </div>
            </div>
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            <div
                className={`fixed top-0 left-0 h-full w-full md:hidden flex flex-col gap-4 bg-white px-4 py-[6px] shadow-md z-50 transform transition-transform duration-300 ease-in-out  ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="relative flex items-center justify-center w-full h-[45px]">
                    <div className="absolute left-0">
                        <Image
                            src={arrowLeftIcon}
                            onClick={closeSidebar}
                            alt="arrowLeftIcon"
                            className={cn("w-[32px] h-[32px]")}
                        />
                    </div>

                    <span className="text-lg font-semibold">Меню</span>
                </div>
                <div className="flex flex-col w-full gap-4">
                    <Input
                        prefix={
                            <Image
                                src={searchIcon}
                                alt="searchIcon"
                                className={cn("w-4 h-4")}
                            />
                        }
                        placeholder="Поиск"
                        className="w-full border rounded-md !bg-[#1C1C1C0D]"
                        style={{ padding: "8px 4px" }}
                        onChange={() => {}}
                    />
                    <div className="bg-[#F7F9FB] w-full rounded-md max-h-[calc(100vh-10rem)] overflow-y-scroll">
                        <Link
                            to={role === "Продавец" ? "profile" : "#"}
                            style={{
                                color: "inherit",
                                textDecoration: "inherit",
                            }}
                            className="flex items-center gap-4 p-4 mb-1 border-b border-[#0000001A]"
                            onClick={closeSidebar}
                        >
                            <Image
                                src={logoLink}
                                alt="logo"
                                className="w-[28px] h-[28px] rounded-full"
                            />
                            <span className="text-lg ">{userEmail}</span>
                        </Link>
                        <div className="flex flex-col space-y-1 pb-[40px]">
                            {menuItems?.map((item, index) => (
                                <div key={item?.key}>
                                    <Link
                                        style={{
                                            color: "inherit",
                                            textDecoration: "inherit",
                                        }}
                                        onClick={() =>
                                            item?.children
                                                ? toggleSubmenu(item.key)
                                                : closeSidebar()
                                        }
                                        className={`flex items-center gap-4 p-4 ${
                                            menuItems.length - 1 !== index &&
                                            "border-b border-[#0000001A]"
                                        }`}
                                        to={item.label.props.to}
                                    >
                                        {item?.icon}
                                        <div className="flex justify-between w-full">
                                            <div className="text-lg">
                                                {item?.label.props.children}
                                            </div>
                                            {item?.children && (
                                                <div
                                                    className={`text-lg transform transition-transform duration-300 ease-in-out ${
                                                        openSubmenus[item.key]
                                                            ? "rotate-180"
                                                            : "rotate-0"
                                                    }`}
                                                >
                                                    <CaretDownOutlined />
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                    {item?.children && (
                                        <div
                                            className={`flex flex-col pl-8 transition-all duration-300 ease-in-out overflow-hidden`}
                                            style={{
                                                maxHeight: openSubmenus[
                                                    item.key
                                                ]
                                                    ? `${
                                                          item.children.length *
                                                          80
                                                      }px`
                                                    : "0px",
                                                opacity: openSubmenus[item.key]
                                                    ? 1
                                                    : 0,
                                            }}
                                        >
                                            <Link
                                                key={item?.key}
                                                to={item.label.props.to}
                                                style={{
                                                    color: "inherit",
                                                    textDecoration: "inherit",
                                                }}
                                                onClick={closeSidebar}
                                                className="py-4 border-b border-[#0000001A]"
                                            >
                                                {item?.label.props.children}
                                            </Link>

                                            {item?.children.map((child) => (
                                                <Link
                                                    key={child.key}
                                                    to={child.label.props.to}
                                                    style={{
                                                        color: "inherit",
                                                        textDecoration:
                                                            "inherit",
                                                    }}
                                                    onClick={closeSidebar}
                                                    className="flex items-center gap-3 py-4 border-b border-[#0000001A]"
                                                >
                                                    {child.icon}
                                                    {child.label.props.children}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
