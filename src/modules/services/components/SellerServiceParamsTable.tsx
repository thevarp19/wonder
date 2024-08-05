import {
    Checkbox,
    ConfigProvider,
    Input,
    Select,
    Table,
    TableColumnsType,
} from "antd";
import { FC, useState } from "react";
import { useMediaQuery } from "react-responsive";

const columns: TableColumnsType<any> = [
    {
        title: "Артикул",
        dataIndex: "article",
        key: "article",
    },
    {
        title: "Название",
        render: (_, record) => <span>{record.shopName}</span>,
    },
    {
        title: "Цена",
        render: (_, record) => <span>{record.price}</span>,
    },
    {
        title: "Упаковка",
        render: (_, record) => <span>{record.price}</span>,
    },
    {
        title: "Тип хранение",
        render: (_, record) => <span>{record.shopName}</span>,
    },
    {
        title: "Хранение",
        render: (_, record) => <span>{record.price}</span>,
    },
    {
        title: "Стоимость услуг",
        render: (_, record) => <span>{record.price}</span>,
    },
];
export const SellerServiceParamsTable: FC = () => {
    const isSmallScreen = useMediaQuery({ query: "(max-width: 640px" });

    const [page, setPage] = useState(0);
    const isPending = false;

    const content = [
        {
            shopName: "Wireless Mouse",
            price: 150,
            orderCode: "1",
        },
        {
            shopName: "Mechanical Keyboard",
            price: 85,
            orderCode: "2",
        },
        {
            shopName: "27-inch Monitor",
            price: 45,
            orderCode: "3",
        },
        {
            shopName: "USB-C Hub",
            price: 200,
            orderCode: "4",
        },
        {
            shopName: "External Hard Drive",
            price: 120,
            orderCode: "5",
        },
        {
            shopName: "27-inch Monitor",
            price: 45,
            orderCode: "3",
        },
        {
            shopName: "USB-C Hub",
            price: 200,
            orderCode: "4",
        },
        {
            shopName: "External Hard Drive",
            price: 120,
            orderCode: "5",
        },
    ];
    const [data, setData] = useState({
        article: "",
        bubbleWrapLayers: "",
        stretchWrapLayers: "",
        fragileTape: false,
        box: false,
        courierBag: false,
        labels: {
            handlingSign: false,
            glassWarning: false,
            batteryWarning: false,
            flammableWarning: false,
        },
    });
    const handleChange = (field: string, value: any) => {
        const newData = { ...data, [field]: value };
        setData(newData);
        // onChange(newData);
    };

    const handleLabelChange = (label: string, value: boolean) => {
        const newLabels = { ...data.labels, [label]: value };
        const newData = { ...data, labels: newLabels };
        setData(newData);
        // onChange(newData);
    };
    return (
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
            <Table
                className="h-full"
                size={isSmallScreen ? "small" : "large"}
                columns={columns}
                loading={isPending}
                dataSource={content}
                expandable={{
                    // expandIcon: ({ expanded, onExpand, record }) =>
                    //     expanded ? (
                    //         <UpCircleOutlined
                    //             size={48}
                    //             onClick={(e) => onExpand(record, e)}
                    //         />
                    //     ) : (
                    //         <DownCircleOutlined
                    //             size={48}
                    //             onClick={(e) => onExpand(record, e)}
                    //         />
                    //     ),
                    expandedRowRender: (_) => (
                        <div className="flex gap-4">
                            <div className="flex flex-col gap-[10px]">
                                <div className="flex items-center gap-2">
                                    <label
                                        htmlFor="bubble-wrap"
                                        className="whitespace-nowrap"
                                    >
                                        Кол-во слоев Пузырчатой пленки :
                                    </label>
                                    <Input
                                        id="bubble-wrap"
                                        className="!w-[100px]"
                                        value={data.bubbleWrapLayers}
                                        onChange={(e) =>
                                            handleChange(
                                                "bubbleWrapLayers",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="flex items-center justify-end gap-2">
                                    <label htmlFor="stretch-wrap">
                                        Кол-во слоев Стретч пленки :
                                    </label>
                                    <Input
                                        id="stretch-wrap"
                                        className="!w-[100px]"
                                        value={data.stretchWrapLayers}
                                        onChange={(e) =>
                                            handleChange(
                                                "stretchWrapLayers",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <Checkbox
                                    className="whitespace-nowrap"
                                    checked={data.fragileTape}
                                    onChange={(e) =>
                                        handleChange(
                                            "fragileTape",
                                            e.target.checked
                                        )
                                    }
                                >
                                    Скотч для хрупких товаров
                                </Checkbox>
                                <Checkbox
                                    checked={data.box}
                                    onChange={(e) =>
                                        handleChange("box", e.target.checked)
                                    }
                                >
                                    Коробка
                                </Checkbox>
                                <Checkbox
                                    checked={data.courierBag}
                                    onChange={(e) =>
                                        handleChange(
                                            "courierBag",
                                            e.target.checked
                                        )
                                    }
                                >
                                    Пакет для Курьера
                                </Checkbox>
                            </div>
                            <div className="flex flex-col flex-wrap gap-2">
                                <Checkbox
                                    checked={data.labels.handlingSign}
                                    onChange={(e) =>
                                        handleLabelChange(
                                            "handlingSign",
                                            e.target.checked
                                        )
                                    }
                                >
                                    Этикетка: Манипуляционный знак
                                </Checkbox>
                                <Checkbox
                                    checked={data.labels.glassWarning}
                                    onChange={(e) =>
                                        handleLabelChange(
                                            "glassWarning",
                                            e.target.checked
                                        )
                                    }
                                >
                                    Этикетка: Осторожно! Стекло!
                                </Checkbox>
                                <Checkbox
                                    checked={data.labels.batteryWarning}
                                    onChange={(e) =>
                                        handleLabelChange(
                                            "batteryWarning",
                                            e.target.checked
                                        )
                                    }
                                >
                                    Этикетка: Осторожно! Аккумуляторные батареи!
                                </Checkbox>
                                <Checkbox
                                    checked={data.labels.flammableWarning}
                                    onChange={(e) =>
                                        handleLabelChange(
                                            "flammableWarning",
                                            e.target.checked
                                        )
                                    }
                                >
                                    Этикетка: Огнеопасно!
                                </Checkbox>
                            </div>
                            <div className="flex justify-center gap-2">
                                {" "}
                                <label
                                    htmlFor="service-type"
                                    className="pt-1 whitespace-nowrap"
                                >
                                    Хранение:
                                </label>
                                <Select
                                    id="service-type"
                                    className="!w-[164px]"
                                    placeholder="Не выбрано"
                                    // onChange={handleTypeChange}
                                >
                                    <Select.Option value="packaging">
                                        Упаковка
                                    </Select.Option>
                                    <Select.Option value="storage">
                                        Хранение
                                    </Select.Option>
                                </Select>
                            </div>
                        </div>
                    ),
                    rowExpandable: (record) => record.name !== "Not Expandable",
                }}
                rowKey={(record) => record.orderCode}
                pagination={{
                    pageSize: 5,
                    total: 10,
                    showSizeChanger: false,
                    onChange(page) {
                        setPage(page - 1);
                    },
                    current: page + 1,
                }}
            />
        </ConfigProvider>
    );
};
