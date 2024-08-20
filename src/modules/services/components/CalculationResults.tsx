import { Typography } from "antd";
import React from "react";
import { CalculatorResponse } from "../types";

const { Text } = Typography;

interface CalculationResultProps {
    responses: CalculatorResponse[];
    formData: {
        title: string;
        dimensions: string;
        weight: string;
        quantity: number;
    }[];
}

const CalculationResult: React.FC<CalculationResultProps> = ({
    responses,
    formData,
}) => {
    if (!responses || responses.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-col gap-5 mt-5">
            {responses.map((response, index) => (
                <div key={index} className="flex gap-5">
                    <div className="p-5 bg-[#F3F3F399] rounded-md shadow-md w-1/2">
                        <h2 className="mb-3 text-lg font-bold">
                            Вводные данные - Услуга {index + 1}
                        </h2>
                        <div className="mb-2">
                            <Text strong>Название: </Text>
                            <Text>{formData[index]?.title || "-"}</Text>
                        </div>
                        <div className="mb-2">
                            <Text strong>Габариты: </Text>
                            <Text>{formData[index]?.dimensions}</Text>
                        </div>
                        <div className="mb-2">
                            <Text strong>Вес: </Text>
                            <Text>{formData[index]?.weight}</Text>
                        </div>
                        <div className="mb-2">
                            <Text strong>Кол-во единиц товара: </Text>
                            <Text>{response.quantity}</Text>
                        </div>
                    </div>
                    <div className="flex w-1/2 gap-5">
                        <div className="p-5 bg-[#F3F3F399] rounded-md shadow-md w-72">
                            <h2 className="mb-3 text-lg font-bold">
                                Услуги за единицу товара
                            </h2>
                            <div className="mb-2">
                                <Text>Приемка: </Text>
                                <Text>{response.cost.issuance} ₸</Text>
                            </div>
                            <div className="mb-2">
                                <Text>Хранение: </Text>
                                <Text>{response.cost.storage} ₸</Text>
                            </div>
                            <div className="mb-2">
                                <Text>Упаковка: </Text>
                                <Text>{response.cost.general_package} ₸</Text>
                            </div>
                            <div className="mb-2">
                                <Text>Доставка до Заммлера: </Text>
                                <Text>{response.cost.delivery} ₸</Text>
                            </div>
                        </div>
                        <div className="p-5 bg-[#F3F3F399] rounded-md shadow-md w-72">
                            <h2 className="mb-3 text-lg font-bold">Сумма</h2>
                            <div className="mb-2">
                                <Text>За единицу: </Text>
                                <Text>{response.cost.final_price} ₸</Text>
                            </div>
                            <div className="mb-2">
                                <Text strong>Общая сумма: </Text>
                                <Text strong>{response.total_cost} ₸</Text>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CalculationResult;
