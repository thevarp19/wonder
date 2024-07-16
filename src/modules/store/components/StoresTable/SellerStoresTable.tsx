import { pencilIcon } from "@/assets";
import { Image } from "@/components/ui/Image";
import { cn } from "@/utils/shared.util";
import { Button, Table, TableColumnsType, Tag } from "antd";
import { FC, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { useGetSellerStores } from "../../queries";
import { GetStoreSellerResponse } from "../../types";
import { StoreSellerSwitch } from "./StoreSellerSwitch";
import { StoreWorkingTimeCell } from "./StoreWorkingTimeCell";

interface SellerStoresTableProps {}

export const SellerStoresTable: FC<SellerStoresTableProps> = ({}) => {
    const { data: stores, isPending } = useGetSellerStores();
    const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });
    const [warehouseStates, setWarehouseStates] = useState<
        Record<number, "Wonder" | "Seller">
    >({});

    useEffect(() => {
        if (stores && !isPending) {
            const newWarehouseStates: Record<number, "Wonder" | "Seller"> = {};
            stores.forEach((store) => {
                if (!store.seller_warehouse && store.wonder_warehouse) {
                    newWarehouseStates[store.warehouse.id] = "Wonder";
                } else if (store.seller_warehouse && !store.wonder_warehouse) {
                    newWarehouseStates[store.warehouse.id] = "Seller";
                } else if (store.seller_warehouse && store.wonder_warehouse) {
                    newWarehouseStates[store.warehouse.id] = "Wonder";
                }
            });
            setWarehouseStates(newWarehouseStates);
        }
    }, [stores, isPending]);

    const columns: TableColumnsType<GetStoreSellerResponse> = [
        {
            title: "Kaspi ID",
            render: (_, record) =>
                record?.seller_warehouse?.kaspi_warehouse_id ?? "-",
        },
        {
            title: "Адрес",
            render: (_, record) => <div>{record.warehouse.street_name}</div>,
        },
        {
            title: "Рабочее время",
            render: (_, record) => (
                <StoreWorkingTimeCell
                    dayOfWeeks={record.warehouse.operating_modes}
                />
            ),
        },
        {
            title: "Статус",
            render: (_, record) => (
                <StoreSellerSwitch record={record.seller_warehouse || null} />
            ),
        },
        {
            title: "Склад",
            render: (_, record) =>
                record.warehouse.is_warehouse ? "Да" : "Нет",
        },
        {
            title: "Редактировать",
            render: (_, record) => (
                <Link
                    to={
                        warehouseStates[record.warehouse.id] === "Seller"
                            ? `/seller/settings/update-store/${record.seller_warehouse.id}`
                            : `/seller/settings/update-store/${record.warehouse.id}/activate`
                    }
                    className="cursor-pointer"
                >
                    <Image
                        src={pencilIcon}
                        alt="pencilIcon"
                        className={cn("w-7 h-7")}
                    />
                </Link>
            ),
        },
        {
            title: "Владелец",
            render: (_, record) => {
                const warehouseState = warehouseStates[record.warehouse.id];
                return warehouseState === "Wonder" ? (
                    <Tag>Wonder</Tag>
                ) : (
                    <Tag>Seller</Tag>
                );
            },
        },
    ];
    return (
        <Table
            columns={columns}
            dataSource={stores}
            footer={() => (
                <div className="flex justify-start">
                    <Button
                        size="large"
                        type="primary"
                        className="w-full md:w-max !rounded-md"
                        href="/seller/settings/create-store"
                    >
                        Создать новый склад
                    </Button>
                </div>
            )}
            loading={isPending}
            pagination={{
                position: isSmallScreen ? ["bottomCenter"] : undefined,
            }}
            scroll={{ x: "max-content" }}
        />
    );
};
