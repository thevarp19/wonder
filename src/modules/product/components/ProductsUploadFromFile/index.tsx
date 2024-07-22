import { InboxOutlined } from "@ant-design/icons";
import { Form, Select, Spin, Upload } from "antd";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { createProductsFromFileMutation } from "../../mutations";
import { GetProductContent } from "../../types";

const { Option } = Select;

interface ProductsUploadFromFileProps {
    setProducts?: (products: GetProductContent[]) => void;
}

export const ProductsUploadFromFile: FC<ProductsUploadFromFileProps> = ({
    setProducts,
}) => {
    const { isPending, mutate, data } = createProductsFromFileMutation();
    const [importType, setImportType] = useState("sheet_additions");

    useEffect(() => {
        if (data && setProducts) {
            setProducts(data);
        }
    }, [data]);

    const handleImportTypeChange = (value: string) => {
        setImportType(value);
    };

    const handleFileUpload = (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
        mutate({ formData, importType });
        return false;
    };
    return (
        <div className="p-4">
            <h1 className="pb-4 text-base font-semibold md:text-2xl">
                Загрузка продуктов
            </h1>

            <Link to="/seller/products/upload/instruction">Инструкция</Link>
            <div className="relative max-w-sm mt-4">
                {isPending && (
                    <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-white">
                        <Spin size="large" />
                    </div>
                )}
                <Form layout="vertical">
                    <Form.Item label="Тип импорта" required>
                        <Select
                            defaultValue="sheet_additions"
                            onChange={handleImportTypeChange}
                        >
                            <Option value="sheet_additions">
                                Добавление листа
                            </Option>
                            <Option value="sheet_replacement">
                                Замена листа
                            </Option>
                            <Option value="sheet_updates">
                                Обновление листа
                            </Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Upload.Dragger
                            multiple={false}
                            maxCount={1}
                            showUploadList={false}
                            accept=".csv, .xls, .xlsx"
                            beforeUpload={handleFileUpload}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                                Нажмите или перетащите файл в эту область для
                                загрузки
                            </p>
                            <p className="ant-upload-hint"></p>
                        </Upload.Dragger>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};
