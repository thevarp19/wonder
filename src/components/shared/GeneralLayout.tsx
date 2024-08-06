import { bellIcon, icon, sidebarIcon } from "@/assets";
import { Logo } from "@/components/shared/Logo";
import { Image } from "@/components/ui/Image";
import { MenuItemType } from "@/types";
import { cn } from "@/utils/shared.util";
import {
    Avatar,
    Breadcrumb,
    ConfigProvider,
    Dropdown,
    Layout,
    MenuProps,
    Spin,
    theme,
} from "antd";
import { FC, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { CustomMenu } from "../ui/CustomMenu";
import { BottomNav } from "./BottomNav";
import { HamburgerMenu } from "./HamburgerMenu";
const { Content, Sider } = Layout;

interface GeneralLayoutProps {
    menuItems: MenuItemType[];
    profileItems: MenuProps["items"];
    logoLink: string;
    isPending?: boolean;
    userEmail: string | undefined;
    breadcrumbItems: {
        [key: string]: { title: string | JSX.Element }[];
    };
    role: "Администратор" | "Продавец" | "Сотрудник";
    selectedKeys: string[];
}

export const GeneralLayout: FC<GeneralLayoutProps> = ({
    menuItems,
    profileItems,
    isPending,
    logoLink,
    breadcrumbItems,
    userEmail,
    role,
    selectedKeys,
}) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const location = useLocation();

    const getBreadcrumbItems = () => {
        return breadcrumbItems[location.pathname] || [];
    };

    return (
        <>
            <HamburgerMenu
                menuItems={menuItems}
                role={role}
                logoLink={logoLink}
                userEmail={userEmail ?? ""}
            />
            <Layout className="pt-[45px] md:h-auto md:pt-0">
                <Sider
                    theme="light"
                    collapsible
                    className={cn(
                        "hidden md:flex px-2 py-5 flex-col justify-center border-r-[1px] border-[#1C1C1C1A] relative"
                    )}
                    collapsed={collapsed}
                    trigger={null}
                >
                    <div className="flex flex-col gap-4 ">
                        <div
                            className={cn("flex items-center gap-4", {
                                "justify-center": collapsed,
                            })}
                        >
                            <div className="w-full h-full">
                                {isPending ? (
                                    <Spin
                                        size="small"
                                        className="w-full h-full"
                                    />
                                ) : (
                                    <div
                                        className={cn(
                                            "flex justify-start items-center gap-2 p-2"
                                        )}
                                    >
                                        <Dropdown
                                            menu={{ items: profileItems }}
                                        >
                                            <Avatar
                                                size={collapsed ? 24 : 32}
                                                src={logoLink}
                                                shape="circle"
                                            />
                                        </Dropdown>
                                        <div className="overflow-hidden text-sm max-w-28">
                                            <h2
                                                className={cn({
                                                    hidden: collapsed,
                                                })}
                                            >
                                                {userEmail}
                                            </h2>
                                            <h2
                                                className={cn({
                                                    hidden: collapsed,
                                                })}
                                            >
                                                {role}
                                            </h2>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <CustomMenu
                            menuItems={menuItems}
                            selectedKeys={selectedKeys}
                        />
                    </div>
                    <div
                        className={cn(
                            "absolute bottom-0 flex justify-center items-center h-[40px] mb-[28px] ms-[3px] "
                        )}
                    >
                        <Link to={logoLink} className="flex items-center">
                            <Image
                                src={icon}
                                className={cn(
                                    { hidden: !collapsed },
                                    "aspect-square w-10"
                                )}
                            />
                        </Link>
                        <div className={cn({ hidden: collapsed })}>
                            <Logo link={logoLink} />
                        </div>
                    </div>
                </Sider>
                <Layout className="flex flex-col h-screen">
                    <header
                        className="hidden md:flex items-center justify-between py-5 px-[28px] border-b-[1px] border-[#1C1C1C1A]"
                        style={{ background: colorBgContainer }}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="p-1 rounded-md cursor-pointer hover:bg-gray-100"
                                onClick={() => setCollapsed(!collapsed)}
                            >
                                <Image
                                    src={sidebarIcon}
                                    alt="collapse"
                                    className={cn("w-6 h-6")}
                                />
                            </div>
                            <ConfigProvider
                                theme={{
                                    components: {
                                        Breadcrumb: {
                                            separatorMargin: 16,
                                        },
                                    },
                                }}
                            >
                                <Breadcrumb items={getBreadcrumbItems()} />
                            </ConfigProvider>
                        </div>

                        <div className="flex items-center gap-5 max-h-[28px]">
                            <div className="w-[215px]">
                                {/* <Input
                                    prefix={
                                        <Image
                                            src={searchIcon}
                                            alt="searchIcon"
                                            className={cn("w-5 h-5 ")}
                                        />
                                    }
                                    placeholder="Поиск"
                                    // value={""}
                                    onChange={() => {}}
                                /> */}
                            </div>
                            <div>
                                <Image
                                    src={bellIcon}
                                    alt="bell"
                                    className={cn("w-6 h-6 cursor-pointer")}
                                />
                            </div>
                        </div>
                    </header>
                    <Content className="h-full p-4 mb-0 bg-white md:overflow-y-scroll grow md:p-7">
                        <Outlet />
                    </Content>
                </Layout>
                <BottomNav />
            </Layout>
        </>
    );
};
