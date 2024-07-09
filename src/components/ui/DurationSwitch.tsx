import { DurationType } from "@/modules/statistics/types";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, Space } from "antd";
import { FC } from "react";

interface DurationSwitchProps {
    duration: DurationType;
    setDuration: (duration: DurationType) => void;
}

const DurationSwitch: FC<DurationSwitchProps> = ({ duration, setDuration }) => {
    const handleMenuClick: MenuProps["onClick"] = (e) => {
        setDuration(e.key as DurationType);
    };

    const items: MenuProps["items"] = [
        { key: "DAY", label: "За день" },
        { key: "WEEK", label: "За неделю" },
        { key: "MONTH", label: "За месяц" },
        { key: "YEAR", label: "За год" },
    ];

    return (
        <Dropdown
            trigger={["click"]}
            menu={{ items, onClick: handleMenuClick }}
            className="text-[14px] sm:text-[18px] font-semibold"
        >
            <div
                className="cursor-pointer "
                onClick={(e) => e.preventDefault()}
            >
                <Space>
                    {duration === "DAY" && "За день"}
                    {duration === "WEEK" && "За неделю"}
                    {duration === "MONTH" && "За месяц"}
                    {duration === "YEAR" && "За год"}
                    <DownOutlined />
                </Space>
            </div>
        </Dropdown>
    );
};

export default DurationSwitch;
