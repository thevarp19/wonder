import { App, ConfigProvider } from "antd";
import { FC, PropsWithChildren } from "react";

interface AntdProviderProps extends PropsWithChildren {}

export const AntdProvider: FC<AntdProviderProps> = ({ children }) => {
    return (
        <ConfigProvider theme={{ token: { colorPrimary: "#00805f" } }}>
            <App>{children}</App>
        </ConfigProvider>
    );
};
