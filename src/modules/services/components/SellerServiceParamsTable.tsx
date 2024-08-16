import { CustomTable } from "@/components/ui/CustomTable";
import {
    Button,
    Checkbox,
    ConfigProvider,
    Input,
    Select,
    TableColumnsType,
} from "antd";
import { FC, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useServiceParams } from "../forms";
import { useGetServiceParams } from "../queries";
import { GetServiceItemsContent } from "../types";

interface SellerServiceParamsTableProps {
    searchValue?: string;
}

const columns: TableColumnsType<GetServiceItemsContent> = [
    {
        title: "Артикул",
        dataIndex: "vendor_code",
        key: "article",
    },
    {
        title: "Название",
        render: (_, record) => <span>{record.title}</span>,
    },
    {
        title: "Цена",
        render: (_, record) => <span>{record.purchase_price}</span>,
    },
    {
        title: "Упаковка",
        render: (_, record) => <span>{record.packaging_price}</span>,
    },
    {
        title: "Тип хранение",
        render: (_, record) => (
            <span>
                {record?.service_parameters?.need_super_safe
                    ? "Супер сейф"
                    : "Стандарт"}
            </span>
        ),
    },
    {
        title: "Хранение",
        render: (_, record) => <span>{record.storage_price}</span>,
    },
    {
        title: "Стоимость услуг",
        render: (_, record) => (
            <span>{record.storage_price + record.packaging_price}</span>
        ),
    },
];
export const SellerServiceParamsTable: FC<SellerServiceParamsTableProps> = ({
    searchValue,
}) => {
    const isSmallScreen = useMediaQuery({ query: "(max-width: 640px" });

    const [page, setPage] = useState(1);

    const { data, isPending } = useGetServiceParams(page, 10, searchValue);
    const ExpandedRowForm: FC<{ record: GetServiceItemsContent }> = ({
        record,
    }) => {
        const { formik, isDirty, handleDirty } = useServiceParams(
            record.service_parameters,
            record.id
        );

        const handleChange = (field: string, value: any) => {
            const newValue = Math.max(0, Number(value) || 0);
            formik.setFieldValue(field, newValue);
            handleDirty();
        };

        const handleLabelChange = (label: string, value: boolean) => {
            formik.setFieldValue(`${label}`, value);
            handleDirty();
        };

        return (
            <div className="flex flex-col">
                <div className="flex gap-4">
                    <div className="flex flex-col gap-[10px]">
                        <div className="flex items-center gap-2">
                            <label htmlFor={`bubble-wrap-${record.id}`}>
                                Кол-во слоев Пузырчатой пленки :
                            </label>
                            <Input
                                id={`bubble-wrap-${record.id}`}
                                className="!w-[50px]"
                                value={
                                    formik.values
                                        .number_of_labels_of_bubble_wrap
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "number_of_labels_of_bubble_wrap",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                        <div className="flex items-center justify-end gap-2">
                            <label htmlFor={`stretch-wrap-${record.id}`}>
                                Кол-во слоев Стретч пленки :
                            </label>
                            <Input
                                id={`stretch-wrap-${record.id}`}
                                className="!w-[50px]"
                                value={
                                    formik.values
                                        .number_of_labels_of_stretch_film
                                }
                                onChange={(e) =>
                                    handleChange(
                                        "number_of_labels_of_stretch_film",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Checkbox
                            className="whitespace-nowrap"
                            checked={
                                formik.values.adhesive_tape_for_fragile_goods
                            }
                            onChange={(e) =>
                                handleChange(
                                    "adhesive_tape_for_fragile_goods",
                                    e.target.checked
                                )
                            }
                        >
                            Скотч для хрупких товаров
                        </Checkbox>
                        <Checkbox
                            checked={formik.values.box}
                            onChange={(e) =>
                                handleChange("box", e.target.checked)
                            }
                        >
                            Коробка
                        </Checkbox>
                        <Checkbox
                            checked={formik.values.courier_package}
                            onChange={(e) =>
                                handleChange(
                                    "courier_package",
                                    e.target.checked
                                )
                            }
                        >
                            Пакет для Курьера
                        </Checkbox>
                    </div>
                    <div className="flex flex-col flex-wrap gap-2">
                        <Checkbox
                            checked={formik.values.label_manipulation_sign}
                            onChange={(e) =>
                                handleLabelChange(
                                    "label_manipulation_sign",
                                    e.target.checked
                                )
                            }
                        >
                            Этикетка: Манипуляционный знак
                        </Checkbox>
                        <Checkbox
                            checked={formik.values.label_caution_class}
                            onChange={(e) =>
                                handleLabelChange(
                                    "label_caution_class",
                                    e.target.checked
                                )
                            }
                        >
                            Этикетка: Осторожно! Стекло!
                        </Checkbox>
                        <Checkbox
                            checked={
                                formik.values.label_careful_rechargeable_battery
                            }
                            onChange={(e) =>
                                handleLabelChange(
                                    "label_careful_rechargeable_battery",
                                    e.target.checked
                                )
                            }
                        >
                            Этикетка: Осторожно! Аккумуляторные батареи!
                        </Checkbox>
                        <Checkbox
                            checked={formik.values.label_flammable}
                            onChange={(e) =>
                                handleLabelChange(
                                    "label_flammable",
                                    e.target.checked
                                )
                            }
                        >
                            Этикетка: Огнеопасно!
                        </Checkbox>
                    </div>
                    <div className="flex justify-center gap-2">
                        <label
                            htmlFor={`service-type-${record.id}`}
                            className="pt-1 whitespace-nowrap"
                        >
                            Хранение:
                        </label>
                        <Select
                            id={`service-type-${record.id}`}
                            className="!w-[164px]"
                            placeholder="Не выбрано"
                            value={
                                formik.values.need_super_safe
                                    ? "super"
                                    : "standard"
                            }
                            onChange={(value) =>
                                handleChange(
                                    "need_super_safe",
                                    value === "super"
                                )
                            }
                        >
                            <Select.Option value="super">
                                Супер сейф
                            </Select.Option>
                            <Select.Option value="standard">
                                Стандарт
                            </Select.Option>
                        </Select>
                    </div>
                </div>
                {isDirty && (
                    <div className="flex mt-5">
                        <Button
                            type="primary"
                            onClick={() => formik.handleSubmit()}
                        >
                            Сохранить
                        </Button>
                    </div>
                )}
            </div>
        );
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
            <CustomTable
                className="h-full"
                size={isSmallScreen ? "small" : "large"}
                columns={columns}
                loading={isPending}
                dataSource={data?.content}
                rowKey={(record) => record.id}
                pagination={{
                    pageSize: 10,
                    total: data?.totalElements,
                    showSizeChanger: false,
                    onChange(page) {
                        setPage(page - 1);
                    },
                    current: page + 1,
                }}
                expandable={{
                    expandedRowRender: (record) => (
                        <ExpandedRowForm record={record} />
                    ),
                }}
                scroll={{ x: "max-content" }}
            />
        </ConfigProvider>
    );
};
