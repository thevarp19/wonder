import { App, Button, Input } from "antd";
import { FC } from "react";

interface LinkInputProps {
    link: string;
}

export const LinkCopyInput: FC<LinkInputProps> = ({ link }) => {
    const { message } = App.useApp();
    const onCopy = async () => {
        try {
            await navigator.clipboard.writeText(link);
            message.success("Ссылка скопирована в буфер обмена!");
        } catch (err) {
            message.error("Не удалось скопировать ссылку.");
        }
    };

    return (
        <div className="flex items-center w-full gap-4">
            <Input
                type="text"
                readOnly
                value={link}
                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <Button
                type="primary"
                onClick={onCopy}
                className="px-4 py-2 font-bold text-white bg-orange-500 rounded-r-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
            >
                Копировать
            </Button>
        </div>
    );
};
