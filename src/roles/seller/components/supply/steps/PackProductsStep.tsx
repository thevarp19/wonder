import { useGetBoxes } from "@/modules/box/queries";
import { useAppDispatch } from "@/redux/utils";
import {
    useSupplyPacks,
    useSupplyProducts,
} from "@/roles/seller/redux/supply/selectors";
import { SupplyPack } from "@/roles/seller/types/supply";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, InputNumber, Popconfirm, Select } from "antd";
import { FC } from "react";
import * as actions from "../../../redux/supply/actions";
interface PackProductsStepProps {}

export const PackProductsStep: FC<PackProductsStepProps> = ({}) => {
    const packs = useSupplyPacks();
    const dispatch = useAppDispatch();
    const { data: boxes } = useGetBoxes();
    return (
        <div>
            <h1 className="mb-4 text-2xl font-semibold">Packing</h1>
            <div className="flex flex-col gap-4">
                {packs.map((pack, index) => (
                    <PackItem key={index} pack={pack} />
                ))}
            </div>
            <Button
                type="primary"
                size="large"
                className="mt-4"
                onClick={() => {
                    dispatch(actions.addPack(boxes?.[0]!));
                }}
            >
                Add a new pack
            </Button>
        </div>
    );
};

const BoxSelect: FC<{ pack: SupplyPack }> = ({ pack }) => {
    const { data: boxes } = useGetBoxes();
    const dispatch = useAppDispatch();
    return (
        <Select
            placeholder={"Choose a box"}
            className="w-80"
            options={boxes?.map((box) => ({
                label: box.description,
                value: box.id,
            }))}
            value={pack.box}
            onChange={(value) => {
                dispatch(actions.updatePack({ ...pack, box: value }));
            }}
        />
    );
};

const PackProductItem: FC<{ pack: SupplyPack }> = ({ pack }) => {
    const products = useSupplyProducts();
    return (
        <div className="flex gap-4">
            <Select
                options={products.map((e) => ({
                    label: `${e.product.name} - ${e.quantity} шт.`,
                    value: e.product.id,
                }))}
                className="w-96"
            />
            <InputNumber defaultValue={0} />
            <DeleteOutlined style={{ fontSize: "20px", cursor: "pointer" }} />
        </div>
    );
};

const PackItem: FC<{ pack: SupplyPack }> = ({ pack }) => {
    const dispatch = useAppDispatch();
    return (
        <Card
            title={
                <div className="flex gap-4">
                    <h2>{pack.id}</h2>
                    <BoxSelect pack={pack} />
                    <Popconfirm
                        title="Delete the pack"
                        description="Are you sure to delete this pack?"
                        onConfirm={() => {
                            dispatch(actions.removePack(pack.id));
                        }}
                    >
                        <Button danger icon={<DeleteOutlined />}>
                            Delete
                        </Button>
                    </Popconfirm>
                </div>
            }
        >
            <div className="flex gap-4">
                <PackProductItem pack={pack} />
            </div>
            <div className="flex gap-4 mt-4">
                <Button>Add product</Button>
                <Button type="primary">Save changes</Button>
            </div>
        </Card>
    );
};
