import { InboxOutlined } from "@ant-design/icons";
import { Spin, Upload } from "antd";
import { FC, useEffect } from "react";
import { createProductsFromFileMutation } from "../../mutations";
import { GetProductContent } from "../../types";

interface ProductsUploadFromFileProps {
    setProducts?: (products: GetProductContent[]) => void;
}

export const ProductsUploadFromFile: FC<ProductsUploadFromFileProps> = ({
    setProducts,
}) => {
    const { isPending, mutate, data } = createProductsFromFileMutation();
    useEffect(() => {
        if (data && setProducts) {
            setProducts(data);
        }
    }, [data]);
    return (
        <div className="p-4">
            <h1 className="pb-4 text-2xl font-semibold">Загрузка продуктов</h1>
            <a
                className=""
                href="https://file-manager-of5r5e4d7a-lm.a.run.app/docs/retrieve/files/%D0%9F%D1%80%D0%B8%D0%BC%D0%B5%D1%80%20%D1%84%D0%B0%D0%B9%D0%BB%D0%B0%20%D0%B8%D0%BC%D0%BF%D0%BE%D1%80%D1%82%D0%B0.xlsx"
            >
                Скачать пример файла
            </a>
            <div className="relative max-w-sm mt-4">
                {isPending && (
                    <div className="absolute top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-white">
                        <Spin size="large" />
                    </div>
                )}
                <Upload.Dragger
                    multiple={false}
                    maxCount={1}
                    showUploadList={false}
                    accept=".csv, .xls, .xlsx"
                    beforeUpload={(file) => {
                        const formData = new FormData();
                        formData.append("file", file);
                        mutate(formData);
                        return false;
                    }}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                        Нажмите или перетащите файл в эту область для загрузки
                    </p>
                    <p className="ant-upload-hint"></p>
                </Upload.Dragger>
            </div>
        </div>
    );
};
