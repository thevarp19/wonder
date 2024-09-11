import { cn } from "@/utils/shared.util";
import { InboxOutlined } from "@ant-design/icons";
import {
    App,
    Button,
    DatePicker,
    Form,
    Select,
    Upload,
    UploadProps,
} from "antd";
import { UploadFile } from "antd/lib";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useCreateReport } from "../forms";
import { useGetEmployeeStores } from "../queries";
import { GetEmployeeStores } from "../types";

interface CreateReportFormProps {}

export const CreateReportForm: FC<CreateReportFormProps> = () => {
    const { formik, mutation } = useCreateReport();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const { message } = App.useApp();
    const { data: stores, isPending } = useGetEmployeeStores();
    const handleDateChange = (value: any) => {
        if (value) {
            const date = new Date(value);
            formik.setFieldValue("created_at", date.toISOString());
        } else {
            formik.setFieldValue("created_at", null);
        }
    };
    const handleFileChange: UploadProps["onChange"] = ({
        fileList: newFileList,
    }) => {
        const isLessThan1MB = (newFileList[0]?.size ?? 0) / 1024 / 1024 < 1;
        if (!isLessThan1MB) {
            message.error("Размер файла должен быть меньше 1 МБ!");
            return;
        }
        setFileList(newFileList);
        if (newFileList.length > 0) {
            setFileList(
                newFileList.map((file) => ({ ...file, status: "done" }))
            );
            if (newFileList.length > 0) {
                formik.setFieldValue("check_url", newFileList[0].originFileObj);
            }
        }
    };

    return (
        <div className="flex flex-col gap-10 items-center md:border border-[#D9D9D9] rounded-[28px] md:px-[126px] px-4 md:py-[34px] pb-[68px] w-full md:w-auto">
            <h2 className="text-[18px] font-semibold">Добавить накладную</h2>

            <Form
                onFinish={formik.submitForm}
                layout="vertical"
                className="flex flex-col w-full md:max-w-[291px] gap-2"
            >
                <Form.Item label="Название магазина" className="w-full !mb-4">
                    <Select
                        placeholder={"Магазины"}
                        showSearch
                        loading={isPending}
                        options={
                            stores && Array.isArray(stores)
                                ? stores.map((store: GetEmployeeStores) => ({
                                      label: store.kaspi_store_name,
                                      value: store.pk,
                                  }))
                                : []
                        }
                        filterOption={(input, option) =>
                            !!option?.label
                                ?.toString()
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        size="large"
                        onSelect={(_, option) => {
                            formik.setFieldValue("seller", option.value);
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label="Дата и время создания"
                    className="w-full !mb-4"
                >
                    <DatePicker
                        showTime={{ format: "HH:mm" }}
                        format="YYYY-MM-DD / HH:mm"
                        className="w-full"
                        size="large"
                        placeholder="Выберите дату и время"
                        onChange={handleDateChange}
                    />
                </Form.Item>
                <Form.Item label="Загрузить накладную" className="w-full !mb-4">
                    <Upload.Dragger
                        name="file"
                        onChange={handleFileChange}
                        multiple={false}
                        fileList={fileList}
                        maxCount={1}
                        accept=".pdf,.jpg,.png"
                    >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Нажмите или перетащите файл в эту область для
                            загрузки
                        </p>
                    </Upload.Dragger>
                </Form.Item>
                <div className="flex flex-col gap-2">
                    <Button
                        htmlType="submit"
                        type="primary"
                        size={"large"}
                        className={cn("w-full !rounded-md")}
                        loading={mutation.isPending}
                    >
                        Добавить
                    </Button>
                    <Link
                        to="/employee/reports"
                        className="w-full cursor-pointer"
                    >
                        <Button
                            size={"large"}
                            className={cn("w-full !rounded-md")}
                        >
                            Отмена
                        </Button>
                    </Link>
                </div>
            </Form>
        </div>
    );
};
