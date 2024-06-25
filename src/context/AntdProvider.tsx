import { StyleProvider } from "@ant-design/cssinjs";
import { App, ConfigProvider } from "antd";
import { FC, PropsWithChildren } from "react";

interface AntdProviderProps extends PropsWithChildren {}

export const AntdProvider: FC<AntdProviderProps> = ({ children }) => {
    return (
        <StyleProvider hashPriority="high">
            <ConfigProvider theme={{ token: { colorPrimary: "#EF7214" } }}>
                <App>{children}</App>
            </ConfigProvider>
        </StyleProvider>
    );
};
