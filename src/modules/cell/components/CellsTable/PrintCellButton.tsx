import { PrinterOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { FC } from "react";

interface PrintCellButtonProps {}

export const PrintCellButton: FC<PrintCellButtonProps> = ({}) => {
    return <Button icon={<PrinterOutlined />}>Print</Button>;
};
