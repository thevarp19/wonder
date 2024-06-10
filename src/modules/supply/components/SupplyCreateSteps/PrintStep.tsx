import { useGetBoxes } from "@/modules/box/queries";
import { StoreAddressCell } from "@/modules/store/components/StoresTable/StoreAddressCell";
import { useGetStore } from "@/modules/store/queries";
import {
    useSupply,
    useSupplyPacks,
} from "@/roles/seller/redux/supply/selectors";
import { SupplyPack } from "@/roles/seller/types/supply";
import { Card } from "antd";
import { FC } from "react";

interface PrintStepProps {}

export const PrintStep: FC<PrintStepProps> = ({}) => {
    const packs = useSupplyPacks();
    const supply = useSupply();
    // @ts-ignore
    const { data: store } = useGetStore(supply?.store || -1);
    const handledPacks = packs
        .filter(
            (pack) =>
                pack.products.reduce(
                    (acum, current) => acum + current.quantity,
                    0
                ) > 0
        )
        .map((pack) => ({
            ...pack,
            products: pack.products.filter((product) => product.quantity > 0),
        }));
    return (
        <div className="mb-4">
            <h1 className="mb-4 text-2xl font-semibold">Печать</h1>
            <h2 className="flex items-center gap-1 mb-4 text-xl font-medium">
                Магазин: {store && <StoreAddressCell {...store} />}
            </h2>
            <h2 className="mb-4 text-xl font-medium">Дата: {supply.date}</h2>
            <div className="grid grid-cols-2 gap-4">
                {handledPacks.map((pack, index) => (
                    <PackItem key={pack.id} pack={pack} index={index} />
                ))}
            </div>
        </div>
    );
};

const PackItem: FC<{ pack: SupplyPack; index: number }> = ({ pack, index }) => {
    const { data: boxes } = useGetBoxes();
    const box = boxes?.find((box) => `${box.id}` == `${pack.box}`);
    return (
        <Card
            title={
                <div className="flex gap-4">
                    <h2>Пакет {index + 1}</h2>
                </div>
            }
        >
            <div className="flex flex-col gap-4">
                <h3>
                    Тип коробки: {box?.name}
                    {", "}
                    {box?.description}
                </h3>
                <div>
                    <h3>Продукты:</h3>
                    <ol>
                        {pack.products.map((product, index) => (
                            <li key={product.id} className="flex">
                                {index + 1} - {product.product.name},{" "}
                                {product.quantity} шт.
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </Card>
    );
};
