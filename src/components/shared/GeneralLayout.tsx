import { icon } from "@/assets";
import { Logo } from "@/components/shared/Logo";
import { Image } from "@/components/ui/Image";
import { cn } from "@/utils/shared.util";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Menu, MenuProps, theme } from "antd";
import { FC, useState } from "react";
import { Link, Outlet } from "react-router-dom";
const { Header, Content, Sider } = Layout;

interface GeneralLayoutProps {
    menuItems: MenuProps["items"];
    profileItems: MenuProps["items"];
    logoLink: string;
    userEmail: string;
    role: "Admin" | "Seller" | "Employee";
    selectedKeys: string[];
}

export const GeneralLayout: FC<GeneralLayoutProps> = ({
    menuItems,
    profileItems,
    logoLink,
    userEmail,
    role,
    selectedKeys,
}) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout>
            <Sider
                theme="light"
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div
                    className={cn("flex justify-center items-center h-[64px]")}
                >
                    <Link to={logoLink}>
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

                <Menu
                    mode="inline"
                    items={menuItems}
                    selectedKeys={selectedKeys}
                    className=" scroll-hidden"
                />
            </Sider>
            <Layout className="flex flex-col h-screen">
                <Header
                    className="flex items-center justify-end"
                    style={{ background: colorBgContainer }}
                >
                    <div className={cn("flex items-center gap-4")}>
                        <div className="leading-normal">
                            <p>{userEmail}</p>
                            <p>{role}</p>
                        </div>
                        <Dropdown menu={{ items: profileItems }}>
                            <Avatar
                                size={48}
                                icon={<UserOutlined />}
                                shape="square"
                            />
                        </Dropdown>
                    </div>
                </Header>
                <Content className="m-4 mb-0 overflow-y-scroll grow">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
