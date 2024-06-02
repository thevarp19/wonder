import { FilterOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FC } from "react";

interface FilterButtonProps {
    onClick?: () => void;
}

export const FilterButton: FC<FilterButtonProps> = ({ onClick }) => {
    return (
        <Button
            type="primary"
            size="large"
            icon={<FilterOutlined />}
            onClick={onClick}
        ></Button>
    );
};
