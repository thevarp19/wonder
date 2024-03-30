import { InboxOutlined } from "@ant-design/icons";
import { Spin, Upload } from "antd";
import { FC, useEffect } from "react";
import { createProductsFromFileMutation } from "../../mutations";
import { GetProductResponse } from "../../types";

interface ProductsUploadFromFileProps {
    setProducts?: (products: GetProductResponse[]) => void;
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
            <h1 className="pb-4 text-2xl font-semibold">Upload products</h1>
            <a className="">Download an example file</a>
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
                        Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint"></p>
                </Upload.Dragger>
            </div>
        </div>
    );
};
