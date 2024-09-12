import { App, Button } from "antd";
import { FC, useCallback } from "react";
import { useGetCellBarcodes } from "../../queries";

interface PrintAllCellsButtonProps {
    storeId: number;
}

export const PrintAllCellsButton: FC<PrintAllCellsButtonProps> = ({
    storeId,
}) => {
    const { refetch: fetchFile } = useGetCellBarcodes(storeId);
    const { message } = App.useApp();
    const handleDownload = useCallback(async () => {
        try {
            const result = await fetchFile();
            if (result.data) {
                const url = window.URL.createObjectURL(new Blob([result.data]));
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", `Ячейки-${storeId}.pdf`);
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
            <Button
                size="large"
                className="w-full md:min-w-[180px] !rounded-md text-xs"
                loading
                disabled
            >
                Печать всех ячеек
            </Button>
        );
    }
    return (
        <>
            <Button
                onClick={handleDownload}
                size="large"
                className="w-full md:min-w-[180px] !rounded-md text-xs"
            >
                Печать всех ячеек
            </Button>
        </>
    );
};
