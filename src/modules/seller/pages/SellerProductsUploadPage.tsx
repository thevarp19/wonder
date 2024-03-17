import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { FC } from "react";

interface SellerProductsUploadPageProps {}

export const SellerProductsUploadPage: FC<
    SellerProductsUploadPageProps
> = ({}) => {
    return (
        <div className="h-full bg-white rounded-t-lg">
            <div className="p-4">
                <h1 className="pb-4 text-2xl font-semibold">Upload products</h1>
                <a className="">Download an example file</a>
                <div className="max-w-sm mt-4">
                    <Upload.Dragger multiple={false}>
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
