import { CustomTable } from "@/components/ui/CustomTable";
import { myLocalStorage } from "@/lib/storage/browserStorage";
import {
    Button,
    Checkbox,
    ConfigProvider,
    InputNumber,
    Modal,
    Select,
    Switch,
    TableColumnsType,
} from "antd";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
    ProductCityPriceChangeState,
    ProductPriceChangeState,
    getPriceChangeRequest,
    getPriceChanges,
    useProductPricesChange,
} from "../../forms";
import {
    changeProductPriceMutation,
    changeProductsVisibilityMutation,
} from "../../mutations";
import { useGetActiveCities, useGetProductsPrices } from "../../queries";
import { GetProductWithPrices, ProductStoreCity } from "../../types";

interface ProductPriceTableProps {
    debouncedSearchValue: string;
    isPublished: boolean | null;
}

const columns: TableColumnsType<GetProductWithPrices> = [
    {
        title: "Артикул",
        dataIndex: "vendor_code",
        // fixed: "left",
        width: 150,
    },
    {
        title: "Название",
        render: (_, record) => record.title,
        width: 200,
        // fixed: "left",
        // width: 150,
    },
    {
        title: "Опубликовано",
        dataIndex: "isPublished",
        render: (_, record) => (
            <ProductEnableSwitch enabled={record.is_published} id={record.id} />
        ),
        width: 100,
    },
    {
        title: "Кол-во",
        render: (_, record) => <div className="">{record.total_quantity}</div>,
        width: 100,
        sorter: (a, b) => a.total_quantity - b.total_quantity,
    },
];

function MainPriceCitySelect({
    isEditable,
    setValue,
    cities,
    mainCityId,
}: {
    isEditable: boolean;
    mainCityId: number | null;
    cities: ProductStoreCity[] | undefined;
    setValue: (value: string, label: string) => void;
}) {
    const selectedCity = cities?.find((city) => city.id === mainCityId) || null;

    return (
        <Select
            disabled={!isEditable}
            style={{ width: "100%", borderRadius: 24 }}
            defaultValue={selectedCity ? selectedCity.id.toString() : null}
            onChange={(_, option) =>
                // @ts-ignore
                setValue(option.value, option.label)
            }
            options={[
                { value: null, label: "Не выбрано" },
                ...(cities ?? []).map((city) => ({
                    value: city.id.toString(),
                    label: city.name,
                })),
            ]}
        ></Select>
    );
}

export function StoreCheckboxes({
    checked,
    setChecked,
    cities,
}: {
    checked: string[];
    setChecked: Dispatch<SetStateAction<string[]>>;
    cities: ProductStoreCity[];
}) {
    return (
        <div className="flex flex-col gap-4">
            {cities.map((city) => (
                <div key={city.name.toLowerCase()}>
                    <Checkbox
                        checked={
                            checked.findIndex((name) => {
                                return name === city.name.toLowerCase();
                            }) !== -1
                        }
                        onChange={(e) => {
                            if (e.target.checked) {
                                setChecked((prev) => [
                                    ...prev,
                                    city.name.toLowerCase(),
                                ]);
                            } else {
                                setChecked((prev) =>
                                    prev.filter(
                                        (name) =>
                                            name.toLowerCase() !==
                                            city.name.toLowerCase()
                                    )
                                );
                            }
                        }}
                    >
                        {city.name}
                    </Checkbox>
                </div>
            ))}
        </div>
    );
}

function findProductPriceAndCountInCity(
    storeName: string,
    record: GetProductWithPrices
) {
    let result = {
        price: 0,
        count: 0,
        storeId: 0,
        color: "",
    };
    record.city_prices.forEach((price) => {
        if (price.city.name.toLowerCase() === storeName.toLowerCase()) {
            result.price = price.price;
            result.count = record.total_quantity;
            result.storeId = price.id;
            result.color = price.color;
        }
    });
    return result;
}

export const ProductPriceTable: FC<ProductPriceTableProps> = ({
    debouncedSearchValue,
    isPublished,
}) => {
    const [page, setPage] = useState(0);

    const [activeStores, setActiveStores] = useState<string[]>(
        myLocalStorage?.get("activeStores") || ["алматы"]
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [isEditable, setIsEditable] = useState(false);
    const { data: cities, isPending: cityPending } = useGetActiveCities();
    const activeStoreIds =
        cities
            ?.filter((city) => activeStores.includes(city.name.toLowerCase()))
            .map((city) => city.id) || [];

    const { data: products, isPending } = useGetProductsPrices(
        page,
        10,
        debouncedSearchValue,
        activeStoreIds,
        isPublished
    );
    useEffect(() => {
        setPage(0);
    }, [debouncedSearchValue]);
    useEffect(() => {
        myLocalStorage?.set("activeStores", activeStores);
    }, [activeStores]);

    const uniqueStores = [];
    for (const store of new Set(activeStores)) {
        if (cities?.length) {
            const storeIndex = cities.findIndex(
                (city) => city.name.toLowerCase() === store.toLowerCase()
            );
            if (storeIndex !== -1) {
                uniqueStores.push(store);
            }
        } else {
            uniqueStores.push(store);
        }
    }

    const { addCityPriceChange, addMainPriceChange, state, clearChanges } =
        useProductPricesChange();

    const newColumns = [
        ...columns,
        {
            title: "Главный город цены",
            render: (_: any, record: GetProductWithPrices) => (
                <MainPriceCitySelect
                    isEditable={isEditable}
                    mainCityId={record?.main_city?.id || null}
                    setValue={(value, label) => {
                        addMainPriceChange({
                            productId: record.id,
                            productName: record.title,
                            mainCityId: Number(value),
                            mainCityName: label,
                        });
                    }}
                    cities={cities}
                />
            ),
            width: 150,
            // fixed: "left",
        },
        ...uniqueStores
            .sort((a, b) => a.localeCompare(b))
            .map((store) => ({
                title: `${store.toLocaleUpperCase()}`,

                render: (_: any, record: GetProductWithPrices) => (
                    <ProductPriceCell
                        store={store}
                        record={record}
                        state={state}
                        isEditable={isEditable}
                        addCityPriceChange={addCityPriceChange}
                    />
                ),
                width: 150,
            })),
    ];

    const { mutateAsync } = changeProductPriceMutation();
    const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

    return (
        <div className="overflow-x-auto w-full md:mb-0 mb-[70px]">
            <Modal
                title="Склады"
                open={isModalOpen}
                cancelText="Назад"
                onCancel={() => {
                    setIsModalOpen(false);
                }}
                onOk={() => {
                    setIsModalOpen(false);
                }}
            >
                <StoreCheckboxes
                    checked={activeStores}
                    setChecked={setActiveStores}
                    cities={cities || []}
                />
            </Modal>
            <div className="flex items-center justify-between px-2 mb-4 md:px-4">
                <div className="flex items-center w-full gap-4"></div>
                <Button
                    onClick={() => {
                        setIsModalOpen(true);
                    }}
                    type="primary"
                >
                    Склады
                </Button>
            </div>
            <ConfigProvider
                theme={{
                    components: {
                        Table: {
                            headerBg: "#fff",
                            headerColor: "#1C1C1C66",
                            headerBorderRadius: 10,
                            headerSplitColor: "#fff",
                        },
                    },
                }}
            >
                <CustomTable
                    // @ts-ignore
                    showSorterTooltip={{ target: "sorter-icon" }}
                    columns={newColumns}
                    locale={{
                        triggerDesc: "Нажмите для сортировки по убыванию",
                        triggerAsc: "Нажмите для сортировки по возрастанию",
                        cancelSort: "Нажмите для отмены сортировки",
                    }}
                    dataSource={products?.content || []}
                    rowKey={(record) => record.vendor_code}
                    loading={isPending || cityPending}
                    // scroll={{ x: 1200 }}
                    footer={() => (
                        <div className="flex justify-end">
                            {isEditable ? (
                                <SavePriceEditButton
                                    state={state}
                                    setIsEditable={setIsEditable}
                                    onClick={async () => {
                                        await mutateAsync(
                                            getPriceChangeRequest(state)
                                        );
                                        clearChanges();
                                        setIsEditable(false);
                                    }}
                                    clearChanges={clearChanges}
                                />
                            ) : (
                                <Button
                                    size="large"
                                    className="md:min-w-[200px] md:w-auto w-full mt-4 md:mt-0 !text-[#EF7214] !border-[#EF7214] cursor-pointer"
                                    onClick={() => setIsEditable(true)}
                                >
                                    Редактировать
                                </Button>
                            )}
                        </div>
                    )}
                    pagination={{
                        pageSize: 10,
                        total: products?.totalElements,
                        showSizeChanger: false,
                        onChange(page) {
                            setPage(page - 1);
                        },
                        current: page + 1,
                        position: isSmallScreen ? ["bottomCenter"] : undefined,
                    }}
                    scroll={{ x: "max-content" }}
                />
            </ConfigProvider>
        </div>
    );
};
function SavePriceEditButton({
    onClick,
    state,
    clearChanges,
    setIsEditable,
}: {
    onClick: () => Promise<void>;
    state: ProductPriceChangeState;
    clearChanges: () => void;
    setIsEditable: Dispatch<SetStateAction<boolean>>;
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <Modal
                open={isModalOpen}
                width={800}
                title="Хотите сохранить изменения?"
                okButtonProps={{ size: "large" }}
                okText="Подтвердить"
                cancelButtonProps={{ size: "large" }}
                cancelText="Назад"
                onOk={async () => {
                    await onClick();
                    setIsModalOpen(false);
                }}
                onCancel={() => {
                    setIsModalOpen(false);
                }}
            >
                {isModalOpen && <PriceChanges {...state} />}
            </Modal>
            <div className="flex justify-end w-full gap-3">
                <Button
                    key="clear"
                    size="large"
                    className="md:min-w-[200px] md:w-auto w-full mt-4 md:mt-0"
                    onClick={() => {
                        clearChanges();
                        setIsModalOpen(false);
                        setIsEditable(false);
                    }}
                >
                    Очистить
                </Button>
                <Button
                    size="large"
                    className="md:min-w-[200px] md:w-auto w-full mt-4 md:mt-0"
                    type="primary"
                    onClick={() => setIsModalOpen(true)}
                >
                    Сохранить
                </Button>
            </div>
        </>
    );
}

function PriceChanges(state: ProductPriceChangeState) {
    return (
        <div>
            {getPriceChanges(state).map((change, index) => (
                <p key={index} className="text-[12px] md:text-base">
                    {change}
                </p>
            ))}
        </div>
    );
}

function ProductPriceCell({
    store,
    record,
    isEditable,
    addCityPriceChange,
    state,
}: {
    store: string;
    record: GetProductWithPrices;
    isEditable: boolean;
    addCityPriceChange: (cityPrice: ProductCityPriceChangeState) => void;
    state: ProductPriceChangeState;
}) {
    const { price, storeId, color } = findProductPriceAndCountInCity(
        store,
        record
    );

    const getColorHex = (color: string) => {
        switch (color) {
            case "red":
                return "#FF415352";
            case "yellow":
                return "#FFC5558F";
            case "green":
                return "#91FC6C85";
            default:
                return "#FFFFFF";
        }
    };
    const backgroundColor = getColorHex(color);

    return (
        <div className="relative w-full h-full ">
            {isEditable ? (
                <InputNumber
                    defaultValue={price}
                    min={10}
                    inputMode="numeric"
                    style={{
                        backgroundColor: backgroundColor,
                        fontWeight: 600,
                        paddingLeft: 10,
                        borderRadius: 16,
                    }}
                    value={
                        state.cityPrices.find(
                            (cityPrice) =>
                                cityPrice.productId === record.id &&
                                cityPrice.cityId === storeId
                        )?.newPrice || price
                    }
                    onChange={(value) => {
                        if (value !== null) {
                            addCityPriceChange({
                                productId: record.id,
                                productName: record.title,
                                cityId: storeId,
                                cityName: store,
                                prevPrice: price,
                                newPrice: Number(value),
                            });
                        }
                    }}
                />
            ) : (
                <div
                    style={{
                        backgroundColor: backgroundColor,
                    }}
                    className="flex items-center justify-center gap-2 py-1 font-semibold border rounded-2xl"
                >
                    {price} ₸
                </div>
            )}
        </div>
    );
}
export function ProductEnableSwitch({
    id,
    enabled,
}: {
    id: number;
    enabled: boolean;
}) {
    const { isPending, mutateAsync } = changeProductsVisibilityMutation();
    return (
        <div className="flex items-center gap-2">
            <Switch
                checked={enabled}
                loading={isPending}
                onChange={async (checked) => {
                    mutateAsync([{ id: id, is_published: checked }]);
                }}
            />
        </div>
    );
}
