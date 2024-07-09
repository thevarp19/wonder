import {
    arrowLeftIcon,
    defaultAvatar,
    hamburgerIcon,
    logo,
    searchIcon,
} from "@/assets";
import { MenuItemType } from "@/types";
import { cn } from "@/utils/shared.util";
import { Input } from "antd";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { Image } from "../ui/Image";

interface HamburgerMenuProps {
    menuItems: MenuItemType[];
}
export const HamburgerMenu: FC<HamburgerMenuProps> = ({ menuItems }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };
    return (
        <>
            <div className="sm:hidden fixed w-full h-[45px] px-4 py-[6px] bg-white z-50">
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
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 sm:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            <div
                className={`fixed top-0 left-0 h-full w-full sm:hidden flex flex-col gap-4 bg-white px-4 py-[6px] shadow-md z-50 transform transition-transform duration-300 ease-in-out ${
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
                        // value={""}
                        style={{ padding: "8px 4px" }}
                        onChange={() => {}}
                    />
                    <div className="bg-[#F7F9FB] w-full rounded-md">
                        <div
                            className="flex items-center gap-4 p-4 mb-1 border-b border-[#0000001A]"
                            onClick={closeSidebar}
                        >
                            <Link to={"profile"}>
                                <Image
                                    src={defaultAvatar}
                                    alt="logo"
                                    className="w-[28px] h-[28px] rounded-full"
                                />
                            </Link>
                            <span className="text-lg font-medium ">
                                Samayryn
                            </span>
                        </div>
                        <div className="flex flex-col space-y-1">
                            {menuItems?.map((item, index) => (
                                <div
                                    key={item?.key}
                                    onClick={closeSidebar}
                                    className={`flex items-center gap-4 p-4 ${
                                        menuItems.length - 1 !== index &&
                                        "border-b border-[#0000001A]"
                                    }`}
                                >
                                    {item?.icon}
                                    <div className="text-lg">{item?.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
