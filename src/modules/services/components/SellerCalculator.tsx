import { FormikInput, FormikNumberInput } from "@/components/ui/FormikInput";
import { useDebounce } from "@/utils/shared.util";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Select } from "antd";
import { FC, useEffect, useState } from "react";
import { useCalculateParams } from "../forms";
import { useInfiniteGetProductsSizes } from "../queries";
import { CalculatorResponse } from "../types";
import CalculationResult from "./CalculationResults";

interface ServiceItemProps {
    formik: any;
    serviceIndex: number;
    removeService: () => void;
}

const ServiceItem: FC<ServiceItemProps> = ({
    formik,
    serviceIndex,
    removeService,
}) => {
    const [serviceType, setServiceType] = useState<string>("");
    const [searchValue, setSearchValue] = useState("");
    const [selectedProductId, setSelectedProductId] = useState<number | null>(
        null
    );
    const debouncedSearchValue = useDebounce(searchValue, 500);

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
        useInfiniteGetProductsSizes(10, debouncedSearchValue);

    const handlePopupScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        if (!isFetchingNextPage) {
            const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
            if (scrollTop + clientHeight >= scrollHeight - 50 && hasNextPage) {
                fetchNextPage();
            }
        }
    };

    const handleProductSelect = (value: number) => {
        setSelectedProductId(value);
        const selectedProduct = data?.pages
            .flatMap((page) => page.content)
            .find((product) => product.id === value);
        if (selectedProduct) {
            formik.setFieldValue(
                `[${serviceIndex}].sizes`,
                selectedProduct.product_size
            );
        }
    };

    useEffect(() => {
        if (serviceType === "by_sizes") {
            setSelectedProductId(null);
        }
    }, [serviceType]);

    const handleTypeChange = (value: string) => {
        setServiceType(value);
    };

    return (
        <div className="flex flex-col gap-10 px-[18px] py-[14px] border rounded-md ">
            <div className="relative flex gap-7">
                <div className="absolute top-0 right-0">
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={removeService}
                    >
                        Удалить
                    </Button>
                </div>
                <div className="flex justify-center gap-2">
                    <label htmlFor="type" className="pt-1 whitespace-nowrap">
                        Ввод по:
                    </label>
                    <Select
                        id="type"
                        className="!w-[164px]"
                        placeholder="Не выбрано"
                        onChange={handleTypeChange}
                    >
                        <Select.Option value="by_title">Названию</Select.Option>
                        <Select.Option value="by_sizes">
                            Габаритам
                        </Select.Option>
                    </Select>
                </div>
                {serviceType === "by_sizes" && (
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <FormikInput
                                name={`[${serviceIndex}].sizes.height`}
                                formik={formik}
                                formItemProps={{ label: "Высота:" }}
                                inputProps={{
                                    className: "!w-[104px]",
                                    suffix: "см",
                                }}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <FormikInput
                                name={`[${serviceIndex}].sizes.length`}
                                formik={formik}
                                formItemProps={{ label: "Длина:" }}
                                inputProps={{
                                    className: "!w-[104px]",
                                    suffix: "см",
                                }}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <FormikInput
                                name={`[${serviceIndex}].sizes.width`}
                                formik={formik}
                                formItemProps={{ label: "Ширина:" }}
                                inputProps={{
                                    className: "!w-[104px]",
                                    suffix: "см",
                                }}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <FormikInput
                                name={`[${serviceIndex}].sizes.weight`}
                                formik={formik}
                                formItemProps={{ label: "Вес:" }}
                                inputProps={{
                                    className: "!w-[104px]",
                                    suffix: "кг",
                                }}
                            />
                        </div>
                    </div>
                )}
                {serviceType === "by_title" && (
                    <div className="flex items-center gap-[5px] min-w-[400px]">
                        <div className="flex items-center gap-[10px]">
                            <Select
                                className="w-[300px]"
                                allowClear
                                loading={isPending}
                                value={selectedProductId}
                                onSelect={handleProductSelect}
                                searchValue={searchValue}
                                onSearch={setSearchValue}
                                onPopupScroll={handlePopupScroll}
                                options={data?.pages.flatMap((page) =>
                                    page.content.map((product) => ({
                                        label: product.title,
                                        value: product.id,
                                    }))
                                )}
                                filterOption={(input, option) =>
                                    !!option?.label
                                        ?.toString()
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                }
                            />
                        </div>
                    </div>
                )}
            </div>
            {serviceType !== "" && (
                <div className="flex justify-start gap-4">
                    <div className="flex flex-col gap-10">
                        <div className="flex items-start gap-6">
                            <h2 className="py-[5px] font-medium">Упаковка:</h2>
                            <div className="flex flex-col gap-[10px]">
                                <div className="flex items-center gap-2">
                                    <FormikNumberInput
                                        name={`[${serviceIndex}].parameters.number_of_labels_of_bubble_wrap`}
                                        formik={formik}
                                        formItemProps={{
                                            label: "Кол-во слоев Пузырчатой пленки :",
                                        }}
                                        inputProps={{ className: "!w-[100px]" }}
                                    />
                                </div>
                                <div className="flex items-center justify-end gap-2">
                                    <FormikNumberInput
                                        name={`[${serviceIndex}].parameters.number_of_labels_of_stretch_film`}
                                        formik={formik}
                                        formItemProps={{
                                            className: "!w-auto",
                                            label: "Кол-во слоев Стретч пленки :",
                                        }}
                                        inputProps={{ className: "!w-[100px]" }}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-4">
                                <Checkbox
                                    checked={
                                        formik.values[serviceIndex].parameters
                                            .adhesive_tape_for_fragile_goods
                                    }
                                    onChange={(e) =>
                                        formik.setFieldValue(
                                            `[${serviceIndex}].parameters.adhesive_tape_for_fragile_goods`,
                                            e.target.checked
                                        )
                                    }
                                >
                                    Скотч для хрупких товаров
                                </Checkbox>
                                <Checkbox
                                    checked={
                                        formik.values[serviceIndex].parameters
                                            .box
                                    }
                                    onChange={(e) =>
                                        formik.setFieldValue(
                                            `[${serviceIndex}].parameters.box`,
                                            e.target.checked
                                        )
                                    }
                                >
                                    Коробка
                                </Checkbox>
                                <Checkbox
                                    checked={
                                        formik.values[serviceIndex].parameters
                                            .courier_package
                                    }
                                    onChange={(e) =>
                                        formik.setFieldValue(
                                            `[${serviceIndex}].parameters.courier_package`,
                                            e.target.checked
                                        )
                                    }
                                >
                                    Пакет для Курьера
                                </Checkbox>
                            </div>
                            <div className="flex flex-col flex-wrap gap-2">
                                <Checkbox
                                    checked={
                                        formik.values[serviceIndex].parameters
                                            .label_manipulation_sign
                                    }
                                    onChange={(e) =>
                                        formik.setFieldValue(
                                            `[${serviceIndex}].parameters.label_manipulation_sign`,
                                            e.target.checked
                                        )
                                    }
                                >
                                    Этикетка: Манипуляционный знак
                                </Checkbox>
                                <Checkbox
                                    checked={
                                        formik.values[serviceIndex].parameters
                                            .label_flammable
                                    }
                                    onChange={(e) =>
                                        formik.setFieldValue(
                                            `[${serviceIndex}].parameters.label_flammable`,
                                            e.target.checked
                                        )
                                    }
                                >
                                    Этикетка: Осторожно! Стекло!
                                </Checkbox>
                                <Checkbox
                                    checked={
                                        formik.values[serviceIndex].parameters
                                            .label_careful_rechargeable_battery
                                    }
                                    onChange={(e) =>
                                        formik.setFieldValue(
                                            `[${serviceIndex}].parameters.label_careful_rechargeable_battery`,
                                            e.target.checked
                                        )
                                    }
                                >
                                    Этикетка: Осторожно! Аккумуляторные батареи!
                                </Checkbox>
                                <Checkbox
                                    checked={
                                        formik.values[serviceIndex].parameters
                                            .label_caution_class
                                    }
                                    onChange={(e) =>
                                        formik.setFieldValue(
                                            `[${serviceIndex}].parameters.label_caution_class`,
                                            e.target.checked
                                        )
                                    }
                                >
                                    Этикетка: Огнеопасно!
                                </Checkbox>
                            </div>
                        </div>
                        <div className="flex items-start gap-6">
                            <h2 className="py-[5px] font-medium">Хранение:</h2>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 ps-7">
                                    <FormikNumberInput
                                        name={`[${serviceIndex}].days`}
                                        formik={formik}
                                        formItemProps={{
                                            label: "Кол-во суток хранения(дней):",
                                            className: "!mb-0",
                                        }}
                                        inputProps={{ className: "!w-[100px]" }}
                                    />
                                </div>
                                <div className="flex items-center">
                                    <Checkbox
                                        checked={
                                            formik.values[serviceIndex]
                                                .parameters.need_super_safe
                                        }
                                        onChange={(e) =>
                                            formik.setFieldValue(
                                                `[${serviceIndex}].parameters.need_super_safe`,
                                                e.target.checked
                                            )
                                        }
                                    >
                                        Супер сейф
                                    </Checkbox>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-start gap-6">
                            <div className="flex items-center gap-2">
                                <FormikNumberInput
                                    name={`[${serviceIndex}].quantity`}
                                    formik={formik}
                                    formItemProps={{
                                        label: "Кол-во единиц товара:",
                                    }}
                                    inputProps={{ className: "!w-[100px]" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceItem;

export const SellerCalculator: FC = () => {
    const { formik, mutation } = useCalculateParams();
    const [responses, setResponses] = useState<CalculatorResponse[]>([]);

    const addService = () => {
        formik.setValues([
            ...formik.values,
            {
                parameters: {
                    box: false,
                    courier_package: false,
                    label_caution_class: false,
                    label_manipulation_sign: false,
                    label_flammable: false,
                    label_careful_rechargeable_battery: false,
                    adhesive_tape_for_fragile_goods: false,
                    number_of_labels_of_bubble_wrap: 0,
                    number_of_labels_of_stretch_film: 0,
                    need_super_safe: false,
                },
                sizes: {
                    length: 0,
                    width: 0,
                    height: 0,
                    weight: 0,
                },
                days: 0,
                quantity: 0,
            },
        ]);
    };

    const removeService = (index: number) => {
        const newValues = [...formik.values];
        newValues.splice(index, 1);
        formik.setValues(newValues);
    };

    const handleSubmit = async () => {
        const result = await mutation.mutateAsync(formik.values);
        setResponses(result);
    };

    const formData = formik.values.map((service) => ({
        title: "-",
        dimensions: `${service.sizes.length}×${service.sizes.width}×${service.sizes.height} см`,
        weight: `${service.sizes.weight} кг`,
        quantity: service.quantity,
    }));

    return (
        <div className="h-full">
            <h1 className="pb-5 font-medium text-[18px]">
                Калькулятор расчета для стоимости услуг
            </h1>

            <Form onSubmitCapture={formik.handleSubmit}>
                <div className="flex flex-col gap-3">
                    {formik.values.map((_, index) => (
                        <ServiceItem
                            key={index}
                            formik={formik}
                            serviceIndex={index}
                            removeService={() => removeService(index)}
                        />
                    ))}
                </div>
                <div className="flex gap-2 w-[410px]">
                    <Button
                        type="primary"
                        size="large"
                        className="!flex !items-center mt-4 w-full"
                        onClick={addService}
                    >
                        <PlusOutlined /> Добавить услугу
                    </Button>
                    <Button
                        type="primary"
                        size="large"
                        className="!flex !items-center !justify-center mt-4 w-full"
                        onClick={handleSubmit}
                    >
                        Рассчитать
                    </Button>
                </div>
            </Form>
            {responses.length > 0 && (
                <CalculationResult responses={responses} formData={formData} />
            )}
        </div>
    );
};
