import { PlusOutlined } from "@ant-design/icons";
import type { GetProp, UploadFile, UploadProps } from "antd";
import { Image, Upload, message } from "antd";
import { FormikProps } from "formik";
import React, { useState } from "react";

interface PhotoUploadProps {
    formik: FormikProps<any>;
    isEditing: boolean;
    fieldName: string;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

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

    const beforeUpload = (file: FileType) => {
        const isJpgOrPng =
            file.type === "image/jpeg" || file.type === "image/png";
        if (!isJpgOrPng) {
            message.error("Можно загружать только файлы JPG/PNG!");
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error("Размер изображения должен быть меньше 2 МБ!");
        }

        return isJpgOrPng && isLt2M ? false : Upload.LIST_IGNORE;
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
                beforeUpload={beforeUpload}
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
