import { axiosAuthorized } from "@/lib/axios";
import { InboxOutlined } from "@ant-design/icons";
import { App, Spin, Upload } from "antd";
import { FC, useState } from "react";

interface SellerProductsUploadPageProps {}

export const SellerProductsUploadPage: FC<
    SellerProductsUploadPageProps
> = ({}) => {
    const { message } = App.useApp();
    const [isLoading, setIsLoading] = useState(false);
    return (
        <div className="h-full bg-white rounded-t-lg">
            <div className="p-4">
                <h1 className="pb-4 text-2xl font-semibold">Upload products</h1>
                <a className="">Download an example file</a>
                <div className="relative max-w-sm mt-4">
                    {isLoading && (
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
                            setIsLoading(true);
                            axiosAuthorized
                                .post("/api/products", formData)
                                .then((res) => {
                                    if (res.status === 201) {
                                        message.success(
                                            "Product uploaded successfully"
                                        );
                                    } else {
                                        throw new Error(
                                            "Product upload failed"
                                        );
                                    }
                                })
                                .catch(() => {
                                    message.error("Product upload failed");
                                })
                                .finally(() => {
                                    setIsLoading(false);
                                });
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
        </div>
    );
};
