import { useGetStore } from "@/modules/store/queries";
import { useAppDispatch } from "@/redux/utils";
import {
    useSupply,
    useSupplyPacks,
    useSupplyProducts,
} from "@/roles/seller/redux/supply/selectors";
import { ProductQuantity, SupplyPack } from "@/roles/seller/types/supply";
import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, Card, InputNumber, Popconfirm, Select } from "antd";
import { FC } from "react";
import { v4 as uuid } from "uuid";
import * as actions from "../../../../roles/seller/redux/supply/actions";

interface PackProductsStepProps {}

export const PackProductsStep: FC<PackProductsStepProps> = ({}) => {
    const packs = useSupplyPacks();
    const dispatch = useAppDispatch();

    return (
        <div>
            <h1 className="mb-4 text-2xl font-semibold">Packing</h1>
            <div className="flex flex-col gap-4">
                {packs.map((pack, index) => (
                    <PackItem key={pack.id} pack={pack} index={index} />
                ))}
            </div>
            <Button
                type="primary"
                size="large"
                className="mt-4"
                onClick={() => {
                    dispatch(actions.createPack(findNextBoxOption(packs)));
                }}
            >
                Add a new pack
            </Button>
        </div>
    );
};

const BoxSelect: FC<{ pack: SupplyPack }> = ({ pack }) => {
    const storeId = Number(`${useSupply().store}`);
    const { data: store, isPending } = useGetStore(storeId);
    const dispatch = useAppDispatch();
    return (
        <Select
            loading={isPending}
            placeholder={"Choose a box"}
            className="w-80"
            options={store?.availableBoxTypes?.map((box) => ({
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

const findNextBoxOption = (packs: SupplyPack[]) => {
    return packs?.map((p) => p.box)[packs.length - 1];
};

const getAvailableProductQuantity = (
    packs: SupplyPack[],
    packId: string,
    products: ProductQuantity[],
    productId: number
) => {
    const productRoot = products.find((p) => p.product.id === productId);
    if (!productRoot) return 0;
    let usedProductsCount = 0;
    packs.forEach((pack) => {
        if (pack.id != packId) {
            const tempProduct = pack.products.find(
                (p) => p.product.id === productId
            );
            if (tempProduct) {
                usedProductsCount += tempProduct.quantity;
            }
        }
    });
    return productRoot.quantity - usedProductsCount;
};

function getProductQuantityLabel(
    value: ProductQuantity,
    packs: SupplyPack[],
    products: ProductQuantity[]
) {
    return `${value.product.name.substring(0, 15)}${
        value.product.name.length > 15 ? "..." : ""
    } - max: ${getAvailableProductQuantity(
        packs,
        "-1",
        products,
        value.product.id
    )} шт.`;
}

const PackProductItem: FC<{
    pack: SupplyPack;
    id: string;
}> = ({ pack, id }) => {
    const products = useSupplyProducts();
    const packs = useSupplyPacks();
    const dispatch = useAppDispatch();
    const value = pack.products.find((p) => p.id == id)!;
    return (
        <div className="flex items-center gap-4">
            <Select
                options={getAvailableProductOptions(pack, products).map(
                    (e) => ({
                        label: getProductQuantityLabel(e, packs, products),
                        value: e.product.id,
                    })
                )}
                // @ts-ignore
                value={getProductQuantityLabel(value, packs, products)}
                onChange={(newValue: number) => {
                    console.log(newValue);
                    const newProduct = products.find(
                        (product) => product.product.id === newValue
                    );
                    if (newProduct) {
                        dispatch(
                            actions.updatePack({
                                ...pack,
                                products: pack.products.map((p) =>
                                    p.id !== id
                                        ? p
                                        : {
                                              id,
                                              product: newProduct.product,
                                              quantity: 0,
                                          }
                                ),
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
            <InputNumber
                value={value.quantity}
                onChange={(newValue) => {
                    if (typeof newValue === "number") {
                        dispatch(
                            actions.updatePack({
                                ...pack,
                                products: pack.products.map((p) =>
                                    p.id !== id
                                        ? p
                                        : {
                                              id,
                                              product: p.product,
                                              quantity: Math.min(
                                                  newValue,
                                                  getAvailableProductQuantity(
                                                      packs,
                                                      pack.id,
                                                      products,
                                                      value.product.id
                                                  )
                                              ),
                                          }
                                ),
                            })
                        );
                    }
                }}
            />
            <DeleteOutlined
                style={{ fontSize: "20px", cursor: "pointer" }}
                onClick={() => {
                    dispatch(
                        actions.updatePack({
                            ...pack,
                            products: pack.products.filter(
                                (product) => product.id !== id
                            ),
                        })
                    );
                }}
            />
        </div>
    );
};

const PackItem: FC<{ pack: SupplyPack; index: number }> = ({ pack, index }) => {
    const dispatch = useAppDispatch();
    const products = useSupplyProducts();
    const packs = useSupplyPacks();
    return (
        <Card
            title={
                <div className="flex gap-4">
                    {/* <h2>{pack.id}</h2> */}
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
                    <Button
                        icon={<CopyOutlined />}
                        onClick={() => {
                            dispatch(
                                actions.addPack(
                                    {
                                        ...pack,
                                        id: uuid(),
                                        products: pack.products.map((p) => ({
                                            ...p,
                                            quantity: Math.min(
                                                getAvailableProductQuantity(
                                                    packs,
                                                    "",
                                                    products,
                                                    p.product.id
                                                ),
                                                p.quantity
                                            ),
                                        })),
                                    },
                                    index + 1
                                )
                            );
                        }}
                    >
                        Copy
                    </Button>
                </div>
            }
        >
            <div className="flex flex-col gap-4">
                {pack.products
                    .filter(
                        (product) =>
                            products.find(
                                (p) => p.product.id == product.product.id
                            )?.quantity !== undefined
                    )
                    .map((product) => (
                        <PackProductItem
                            key={product.id}
                            id={product.id}
                            pack={pack}
                        />
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
                                            id: uuid(),
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
