import { myLocalStorage } from "@/lib/storage/browserStorage";
import { SupplyPack } from "@/modules/seller/types/supply";
import { Button, InputNumber, Select } from "antd";
import { FC, useState } from "react";

interface PackProductsStepProps {}

export const PackProductsStep: FC<PackProductsStepProps> = ({}) => {
    const [packs, setPacks] = useState<SupplyPack[]>(
        myLocalStorage?.get("supply-packs") || [1, 2]
    );
    return (
        <div>
            Packing
            <div>
                {packs.map((pack, index) => (
                    <BoxInput key={index} />
                ))}
            </div>
        </div>
    );
};

export const BoxInput: FC = () => {
    return (
        <div>
            BoxInput
            <Select />
            <InputNumber />
            <div className="flex">
                <Button>Add product</Button>
            </div>
        </div>
    );
};
