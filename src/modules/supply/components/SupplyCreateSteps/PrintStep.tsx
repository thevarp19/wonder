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
    return (
        <div className="mb-4">
            <h1 className="mb-4 text-2xl font-semibold">Print</h1>
            <h2 className="flex items-center gap-1 mb-4 text-xl font-medium">
                Store: {store && <StoreAddressCell {...store} />}
            </h2>
            <h2 className="mb-4 text-xl font-medium">Date: {supply.date}</h2>
            <div className="grid grid-cols-2 gap-4">
                {packs.map((pack, index) => (
                    <PackItem key={pack.id} pack={pack} index={index} />
                ))}
            </div>
        </div>
    );
};

const PackItem: FC<{ pack: SupplyPack; index: number }> = ({ pack }) => {
    const { data: boxes } = useGetBoxes();
    return (
        <Card
            title={
                <div className="flex gap-4">
                    <h2>Box id: {pack.id}</h2>
                </div>
            }
        >
            <div className="flex flex-col gap-4">
                <h3>
                    Box type:{" "}
                    {
                        boxes?.find((box) => `${box.id}` == `${pack.box}`)
                            ?.description
                    }
                </h3>
                <div>
                    <h3>Products:</h3>
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
