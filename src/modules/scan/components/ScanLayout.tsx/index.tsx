import { Logo } from "@/components/shared/Logo";
import { cn } from "@/utils/shared.util";
import { Layout, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import { FC } from "react";
import { Outlet } from "react-router-dom";
const { Content } = Layout;

interface ScanLayoutProps {}

export const ScanLayout: FC<ScanLayoutProps> = ({}) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout>
            <Layout className="flex flex-col h-screen">
                <Header
                    style={{ background: colorBgContainer }}
                    className="flex items-center justify-center"
                >
                    <div
                        className={cn(
                            "flex justify-center items-center h-[36px]"
                        )}
                    >
                        <Logo link={"/employee"} />
                    </div>
                </Header>
                <Content className="m-2 mb-0 overflow-y-scroll grow">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
