import { ConfigProvider, Menu } from "antd";
import { MenuProps } from "antd/lib";
import { FC } from "react";
interface CustomMenuProps {
    menuItems: MenuProps["items"];
    selectedKeys: string[];
}
export const CustomMenu: FC<CustomMenuProps> = ({
    menuItems,
    selectedKeys,
}) => {
    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        activeBarBorderWidth: 0,
                        itemMarginBlock: 0,
                        itemMarginInline: 0,
                    },
                },
            }}
        >
            <div className="flex flex-col gap-2">
                <h2 className="text-sm text-[#1C1C1C66] ps-1">Меню</h2>
                <div className="max-h-[550px] overflow-y-scroll">
                    <Menu
                        mode="inline"
                        items={menuItems}
                        selectedKeys={selectedKeys}
                        className="scroll-hidden"
                    />
                </div>
            </div>
        </ConfigProvider>
    );
};
