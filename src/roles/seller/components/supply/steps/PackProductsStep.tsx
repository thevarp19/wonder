import { useAppDispatch } from "@/redux/utils";
import { useGetBoxes } from "@/roles/admin/hooks/useGetBoxes";
import { useGetStoresWithDetails } from "@/roles/admin/hooks/useGetStoresWithDetails";
import { useSupplyPacks } from "@/roles/seller/redux/supply/selectors";
import { SupplyPack } from "@/roles/seller/types/supply";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, InputNumber, Select } from "antd";
import { FC } from "react";
import * as actions from "../../../redux/supply/actions";
interface PackProductsStepProps {}

export const PackProductsStep: FC<PackProductsStepProps> = ({}) => {
    const packs = useSupplyPacks();
    const dispatch = useAppDispatch();
    return (
        <div>
            <h1 className="mb-4 text-2xl font-semibold">Packing</h1>
            <div className="flex flex-col gap-4">
                {packs.map((pack, index) => (
                    <BoxInput key={index} pack={pack} />
                ))}
            </div>
            <Button
                type="primary"
                className="mt-4"
                onClick={() => {
                    dispatch(
                        // @ts-ignore
                        actions.addPack([])
                    );
                }}
            >
                Add box
            </Button>
        </div>
    );
};

const StoreSelect = () => {
    const { data: stores, isPending } = useGetStoresWithDetails();
    return (
        <Select
            placeholder={"Choose a store"}
            className="w-80"
            options={stores?.map((store) => ({
                label: store.kaspiId,
                value: store.id,
            }))}
            value={undefined}
            onChange={(v) => {}}
            loading={false}
        />
    );
};

const BoxSelect = () => {
    const { data: boxes, isPending } = useGetBoxes();
    return (
        <Select
            placeholder={"Choose a box"}
            className="w-80"
            options={boxes?.map((box) => ({
                label: box.description,
                value: box.id,
            }))}
            value={undefined}
            onChange={(v) => {}}
            loading={false}
        />
    );
};

export const ProductInput: FC<{}> = ({}) => {
    return (
        <div className="flex gap-4">
            <Select options={[]} className="w-96" />
            <InputNumber defaultValue={0} />
            <DeleteOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
        </div>
    );
};

export const BoxInput: FC<{ pack: SupplyPack }> = ({}) => {
    return (
        <Card
            title={
                <div className="flex gap-4">
                    <StoreSelect />
                    <BoxSelect />
                    <DeleteOutlined
                        style={{ fontSize: "20px", cursor: "pointer" }}
                    />
                </div>
            }
        >
            <div className="flex gap-4">
                <Select options={[]} className="w-96" />
                <InputNumber defaultValue={0} />
                <DeleteOutlined
                    style={{ fontSize: "20px", cursor: "pointer" }}
                />
            </div>
            <div className="flex gap-4 mt-4">
                <Button>Add product</Button>
                <Button type="primary">Save changes</Button>
            </div>
        </Card>
    );
};
