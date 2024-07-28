import { ProductsUploadInstructions } from "@/modules/product/components/ProductsUploadInstructions";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";
import React from "react";

export const ProductsUploadInstructionsCollapse: React.FC = () => {
    const panelStyle: React.CSSProperties = {
        marginBottom: 13,
        borderRadius: 10,
        border: "solid",
        borderColor: "#000",
        borderWidth: 1,
        fontSize: 16,
        fontWeight: 600,
    };

    const items: CollapseProps["items"] = [
        {
            key: "1",
            label: "Ручная Загрузка",
            children: <ProductsUploadInstructions />,
            style: panelStyle,
        },
        {
            key: "2",
            label: "Автоматическая Загрузка",
            children: <></>,
            style: panelStyle,
        },
    ];

    const customExpandIcon: CollapseProps["expandIcon"] = ({ isActive }) => {
        return isActive ? <UpOutlined /> : <DownOutlined />;
    };

    return (
        <div className="text-base">
            <h1 className="font-semibold">Инструкция по загрузке товаров</h1>
            <p className="mt-[13px]">
                Ручная загрузка- Импортирования товаров через загрузку табличных
                файлов на сайт. Файл предоставляется продавцом.
            </p>
            <p className="mb-[18px]">
                Автоматическая- Требует доступа на Сайт Каспи Продавца. Товары
                загруаются без участия Продавца.
            </p>
            <Collapse
                ghost
                items={items}
                expandIconPosition="end"
                expandIcon={customExpandIcon}
            />
        </div>
    );
};
