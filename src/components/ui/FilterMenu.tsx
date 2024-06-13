import { FilterOutlined } from "@ant-design/icons";
import { Button, Checkbox, Dropdown, MenuProps } from "antd";
import { DropdownProps } from "antd/lib";
import React, { useState } from "react";

interface FilterMenuProps {
    checkedItems: {
        byOrderCode: boolean;
        byShopName: boolean;
        byStoreAddress: boolean;
        byProductName: boolean;
        byProductArticle: boolean;
        byProductVendorCode: boolean;
    };
    setCheckedItems: React.Dispatch<
        React.SetStateAction<{
            byOrderCode: boolean;
            byShopName: boolean;
            byStoreAddress: boolean;
            byProductName: boolean;
            byProductArticle: boolean;
            byProductVendorCode: boolean;
        }>
    >;
}

export const FilterMenu: React.FC<FilterMenuProps> = ({
    checkedItems,
    setCheckedItems,
}) => {
    const [open, setOpen] = useState(false);

    const handleOpenChange: DropdownProps["onOpenChange"] = (
        nextOpen,
        info
    ) => {
        if (info.source === "trigger" || nextOpen) {
            setOpen(nextOpen);
        }
    };

    const handleCheckboxChange = (e: any) => {
        setCheckedItems({
            ...checkedItems,
            [e.target.name]: e.target.checked,
        });
    };

    const items: MenuProps["items"] = [
        {
            key: "byOrderCode",
            label: (
                <Checkbox
                    name="byOrderCode"
                    checked={checkedItems.byOrderCode}
                    onChange={handleCheckboxChange}
                    className="mb-2"
                >
                    ID Заказа
                </Checkbox>
            ),
        },
        {
            key: "byShopName",
            label: (
                <Checkbox
                    name="byShopName"
                    checked={checkedItems.byShopName}
                    onChange={handleCheckboxChange}
                    className="mb-2"
                >
                    Названию склада
                </Checkbox>
            ),
        },
        {
            key: "byStoreAddress",
            label: (
                <Checkbox
                    name="byStoreAddress"
                    checked={checkedItems.byStoreAddress}
                    onChange={handleCheckboxChange}
                    className="mb-2"
                >
                    Адресу склада
                </Checkbox>
            ),
        },
        {
            key: "byProductName",
            label: (
                <Checkbox
                    name="byProductName"
                    checked={checkedItems.byProductName}
                    onChange={handleCheckboxChange}
                >
                    Названию продукта
                </Checkbox>
            ),
        },

        {
            key: "byProductArticle",
            label: (
                <Checkbox
                    name="byProductArticle"
                    checked={checkedItems.byProductArticle}
                    onChange={handleCheckboxChange}
                >
                    Артикулу продукта
                </Checkbox>
            ),
        },
        {
            key: "byProductVendorCode",
            label: (
                <Checkbox
                    name="byProductVendorCode"
                    checked={checkedItems.byProductVendorCode}
                    onChange={handleCheckboxChange}
                >
                    Вендор коду продукта
                </Checkbox>
            ),
        },
    ];

    return (
        <Dropdown
            menu={{ items }}
            onOpenChange={handleOpenChange}
            open={open}
            trigger={["click"]}
        >
            <Button
                type="primary"
                icon={<FilterOutlined />}
                className="flex items-center justify-center"
            >
                Filter
            </Button>
        </Dropdown>
    );
};
