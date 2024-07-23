import { PlusOutlined } from "@ant-design/icons";
import type { UploadFile, UploadProps } from "antd";
import { Image, Upload } from "antd";
import { FormikProps } from "formik";
import React, { useState } from "react";

interface PhotoUploadProps {
    formik: FormikProps<any>;
    isEditing: boolean;
    fieldName: string;
}

export const PhotoUpload: React.FC<PhotoUploadProps> = ({
    formik,
    isEditing,
    fieldName,
}) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handlePreview = async (file: UploadFile) => {
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps["onChange"] = ({
        fileList: newFileList,
    }) => {
        setFileList(newFileList);
        if (newFileList.length > 0) {
            setFileList(
                newFileList.map((file) => ({ ...file, status: "done" }))
            );
            if (newFileList.length > 0) {
                formik.setFieldValue(fieldName, newFileList[0].originFileObj);
            }
        }
    };

    const uploadButton = (
        <button style={{ border: 0, background: "none" }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Загрузить</div>
        </button>
    );

    return (
        <>
            <Upload
                listType="picture-circle"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                disabled={!isEditing}
                showUploadList={{ showRemoveIcon: isEditing }}
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            {previewImage && (
                <Image
                    wrapperStyle={{ display: "none" }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) =>
                            !visible && setPreviewImage(""),
                    }}
                    src={previewImage}
                />
            )}
        </>
    );
};
