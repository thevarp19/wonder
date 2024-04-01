import { useGetBoxes } from "@/modules/box/queries";
import { useAppDispatch } from "@/redux/utils";
import {
    useSupplyPacks,
    useSupplyProducts,
} from "@/roles/seller/redux/supply/selectors";
import { ProductQuantity, SupplyPack } from "@/roles/seller/types/supply";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Card, InputNumber, Popconfirm, Select } from "antd";
import { FC } from "react";
import { v4 as uuid } from "uuid";
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

const getAvailableProductOptions = (
    pack: SupplyPack,
    products: ProductQuantity[]
) => {
    return products.filter(
        (product) =>
            !pack.products.find(
                (packProduct) => packProduct.product.id === product.product.id
            )
    );
};

const findNextProductOption = (
    pack: SupplyPack,
    productOptions: ProductQuantity[]
) => {
    return productOptions.find(
        (option) =>
            !pack.products.find(
                (product) => product.product.id === option.product.id
            )
    );
};

const PackProductItem: FC<{
    pack: SupplyPack;
    value: ProductQuantity;
}> = ({ pack, value }) => {
    const products = useSupplyProducts();
    const dispatch = useAppDispatch();
    return (
        <div className="flex gap-4">
            <Select
                options={getAvailableProductOptions(pack, products).map(
                    (e) => ({
                        label: `${e.product.name} - ${e.quantity} шт.`,
                        value: e.product.id,
                    })
                )}
                value={value}
                onChange={(value) => {
                    const removedProducts = pack.products.filter(
                        (product) => product.product.id !== value.product.id
                    );
                    const newProduct = products.find(
                        (product) => product.product.id === value.product.id
                    );
                    if (newProduct) {
                        dispatch(
                            actions.updatePack({
                                ...pack,
                                products: [
                                    ...removedProducts,
                                    {
                                        product: newProduct.product,
                                        quantity: 0,
                                    },
                                ],
                            })
                        );
                    }
                }}
                showSearch
                filterOption={(input, option) =>
                    !!option?.label
                        ?.toString()
                        .toLowerCase()
                        .includes(input.toLowerCase())
                }
                className="w-96"
            />
            <InputNumber value={value.quantity} />
            <DeleteOutlined
                style={{ fontSize: "20px", cursor: "pointer" }}
                onClick={() => {
                    dispatch(
                        actions.updatePack({
                            ...pack,
                            products: pack.products.filter(
                                (product) =>
                                    product.product.id !== value.product.id
                            ),
                        })
                    );
                }}
            />
        </div>
    );
};

const PackItem: FC<{ pack: SupplyPack }> = ({ pack }) => {
    const dispatch = useAppDispatch();
    const products = useSupplyProducts();
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
            <div className="flex flex-col gap-4">
                {pack.products.map((product) => (
                    <PackProductItem key={uuid()} pack={pack} value={product} />
                ))}
            </div>
            <div className="flex gap-4 mt-4">
                <Button
                    onClick={() => {
                        const product = findNextProductOption(pack, products);
                        if (product) {
                            dispatch(
                                actions.updatePack({
                                    ...pack,
                                    products: [
                                        ...pack.products,
                                        {
                                            product: product.product,
                                            quantity: 0,
                                        },
                                    ],
                                })
                            );
                        }
                    }}
                >
                    Add product
                </Button>
            </div>
        </Card>
    );
};
