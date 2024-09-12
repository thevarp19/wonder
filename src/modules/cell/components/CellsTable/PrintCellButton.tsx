import { PrinterOutlined } from "@ant-design/icons";
import { App, Button } from "antd";
import { FC, useCallback } from "react";
import { useGetCellBarcodeById } from "../../queries";

interface PrintCellButtonProps {
    storeId: number;
    cellId: number;
}

export const PrintCellButton: FC<PrintCellButtonProps> = ({
    storeId,
    cellId,
}) => {
    const { refetch: fetchFile } = useGetCellBarcodeById(storeId, cellId);
    const { message } = App.useApp();
    const handleDownload = useCallback(async () => {
        try {
            const result = await fetchFile();
            if (result.data) {
                const url = window.URL.createObjectURL(new Blob([result.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `Ячейка-${cellId}.pdf`);
                document.body.appendChild(link);
                link.click();
                link.remove();
            }
        } catch (error) {
            message.error("Ошибка при скачивании файла!");
        }
    }, [fetchFile]);
    if (!storeId) {
        return (
            <Button icon={<PrinterOutlined />} loading disabled>
                Печать
            </Button>
        );
    }
    return (
        <>
            <Button icon={<PrinterOutlined />} onClick={handleDownload}>
                Печать
            </Button>
        </>
    );
};
