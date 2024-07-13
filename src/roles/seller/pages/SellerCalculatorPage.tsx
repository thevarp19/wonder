import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, Select } from "antd";
import { FC, useState } from "react";

interface SellerCalculatorPageProps {}

interface PackagingServiceProps {
    key: number;
    onChange: (data: any) => void;
}
interface StorageServiceProps {
    key: number;
    onChange: (data: any) => void;
}

interface ServiceItemProps {
    key: number;
    type?: string;
    data?: any;
}

const PackagingService: FC<PackagingServiceProps> = ({ key, onChange }) => {
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
        onChange(newData);
    };

    const handleLabelChange = (label: string, value: boolean) => {
        const newLabels = { ...data.labels, [label]: value };
        const newData = { ...data, labels: newLabels };
        setData(newData);
        onChange(newData);
    };

    return (
        <div className="flex gap-4" key={key}>
            <div className="flex flex-col gap-[10px]">
                <div className="flex items-center gap-2">
                    <label htmlFor="bubble-wrap" className="whitespace-nowrap">
                        Кол-во слоев Пузырчатой пленки :
                    </label>
                    <Input
                        id="bubble-wrap"
                        className="!w-[100px]"
                        value={data.bubbleWrapLayers}
                        onChange={(e) =>
                            handleChange("bubbleWrapLayers", e.target.value)
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
                            handleChange("stretchWrapLayers", e.target.value)
                        }
                    />
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <Checkbox
                    className="whitespace-nowrap"
                    checked={data.fragileTape}
                    onChange={(e) =>
                        handleChange("fragileTape", e.target.checked)
                    }
                >
                    Скотч для хрупких товаров
                </Checkbox>
                <Checkbox
                    checked={data.box}
                    onChange={(e) => handleChange("box", e.target.checked)}
                >
                    Коробка
                </Checkbox>
                <Checkbox
                    checked={data.courierBag}
                    onChange={(e) =>
                        handleChange("courierBag", e.target.checked)
                    }
                >
                    Пакет для Курьера
                </Checkbox>
            </div>
            <div className="flex flex-col flex-wrap gap-2">
                <Checkbox
                    checked={data.labels.handlingSign}
                    onChange={(e) =>
                        handleLabelChange("handlingSign", e.target.checked)
                    }
                >
                    Этикетка: Манипуляционный знак
                </Checkbox>
                <Checkbox
                    checked={data.labels.glassWarning}
                    onChange={(e) =>
                        handleLabelChange("glassWarning", e.target.checked)
                    }
                >
                    Этикетка: Осторожно! Стекло!
                </Checkbox>
                <Checkbox
                    checked={data.labels.batteryWarning}
                    onChange={(e) =>
                        handleLabelChange("batteryWarning", e.target.checked)
                    }
                >
                    Этикетка: Осторожно! Аккумуляторные батареи!
                </Checkbox>
                <Checkbox
                    checked={data.labels.flammableWarning}
                    onChange={(e) =>
                        handleLabelChange("flammableWarning", e.target.checked)
                    }
                >
                    Этикетка: Огнеопасно!
                </Checkbox>
            </div>
        </div>
    );
};

const StorageService: FC<StorageServiceProps> = ({ key, onChange }) => {
    const [data, setData] = useState({
        storageType: "",
        storageDays: "",
    });

    const handleChange = (field: string, value: any) => {
        const newData = { ...data, [field]: value };
        setData(newData);
        onChange(newData);
    };

    return (
        <div className="flex gap-4" key={key}>
            <div className="flex items-center gap-2">
                <Select
                    id="storage-type"
                    className="!w-[164px]"
                    placeholder="Не выбрано"
                    value={data.storageType}
                    onChange={(value) => handleChange("storageType", value)}
                >
                    <Select.Option value="standard">Стандарт</Select.Option>
                    <Select.Option value="premium">Премиум</Select.Option>
                </Select>
            </div>
            <div className="flex items-center gap-2">
                <label htmlFor="storage-days">Кол-во суток хранения:</label>
                <Input
                    id="storage-days"
                    className="!w-[100px]"
                    suffix="дней"
                    value={data.storageDays}
                    onChange={(e) =>
                        handleChange("storageDays", e.target.value)
                    }
                />
            </div>
        </div>
    );
};

const ServiceItem: FC<
    ServiceItemProps & {
        updateService: (id: number, type: string, data: any) => void;
    }
> = ({ key, updateService }) => {
    const [serviceType, setServiceType] = useState<string>("");

    const handleTypeChange = (value: string) => {
        setServiceType(value);
        updateService(key, value, {});
    };

    const handleDataChange = (data: any) => {
        updateService(key, serviceType, data);
    };

    return (
        <div className="flex flex-col gap-4 px-[18px] py-[14px] border rounded-md">
            <div className="flex gap-7">
                <div className="flex items-center gap-[5px] min-w-[400px]">
                    <div className="flex items-center gap-[10px]">
                        <label
                            htmlFor="article-search"
                            className="whitespace-nowrap"
                        >
                            Найти по Артикулу
                        </label>
                        <Input
                            id="article-search"
                            className="!min-w-52"
                            prefix={<SearchOutlined />}
                            placeholder="Поиск"
                        />
                    </div>
                    <Button type="primary" className="ml-2">
                        Найти
                    </Button>
                </div>
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <label htmlFor="height">Высота:</label>
                        <Input
                            id="height"
                            className="!w-[104px]"
                            placeholder=""
                            suffix="см"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="length">Длина:</label>
                        <Input
                            id="length"
                            className="!w-[104px]"
                            placeholder=""
                            suffix="см"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="width">Ширина:</label>
                        <Input
                            id="width"
                            className="!w-[104px]"
                            placeholder=""
                            suffix="см"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="weight">Вес:</label>
                        <Input
                            id="weight"
                            className="!w-[104px]"
                            placeholder=""
                            suffix="кг"
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-start gap-4">
                <div className="flex justify-center gap-2">
                    <label
                        htmlFor="service-type"
                        className="pt-1 whitespace-nowrap"
                    >
                        Вид услуги:
                    </label>
                    <Select
                        id="service-type"
                        className="!w-[164px]"
                        placeholder="Не выбрано"
                        onChange={handleTypeChange}
                    >
                        <Select.Option value="packaging">
                            Упаковка
                        </Select.Option>
                        <Select.Option value="storage">Хранение</Select.Option>
                    </Select>
                </div>
                <div className="flex ">
                    {serviceType === "packaging" ? (
                        <PackagingService
                            key={key}
                            onChange={handleDataChange}
                        />
                    ) : serviceType === "storage" ? (
                        <StorageService key={key} onChange={handleDataChange} />
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export const SellerCalculatorPage: FC<SellerCalculatorPageProps> = () => {
    const [services, setServices] = useState<ServiceItemProps[]>([]);

    const addService = () => {
        setServices([
            ...services,
            { key: services.length, type: "", data: {} },
        ]);
    };

    const updateService = (id: number, type: string, data: any) => {
        setServices(
            services.map((service) =>
                service.key === id ? { ...service, type, data } : service
            )
        );
    };

    const handleSubmit = () => {
        console.log(services);

        // Send the services state to the backend
        fetch("/api/services", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ services }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    return (
        <div className="h-full">
            <h1 className="pb-5 font-medium text-[18px]">
                Калькулятор расчета для стоимости услуг
            </h1>
            <div className="flex flex-col gap-3">
                {services.map((service) => (
                    <ServiceItem
                        key={service.key}
                        updateService={updateService}
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
        </div>
    );
};
