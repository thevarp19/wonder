import { Loading } from "@/components/ui/Loading";
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
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUpdateReport } from "../forms";
import { deleteReportMutation } from "../mutations";
import { useGetEmployeeReportDetail, useGetEmployeeStores } from "../queries";
import { GetEmployeeStores } from "../types";

interface UpdateReportFormProps {
    reportId: string;
}

export const UpdateReportForm: FC<UpdateReportFormProps> = ({ reportId }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const { data: initialValues, isPending: reportIsPending } =
        useGetEmployeeReportDetail(reportId);
    const { message } = App.useApp();
    const { formik, mutation } = useUpdateReport(reportId, initialValues);
    const { data: stores, isPending } = useGetEmployeeStores();
    const { mutateAsync } = deleteReportMutation(reportId);
    useEffect(() => {
        if (initialValues) {
            formik.resetForm({
                values: initialValues,
            });

            if (initialValues.check_url) {
                setFileList([
                    {
                        uid: "-1",
                        name: initialValues.check_url,
                        status: "done",
                        url: initialValues.check_url,
                    },
                ]);
            }
        }
    }, [initialValues]);

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
            formik.setFieldValue("check_url", newFileList[0].originFileObj);
        }
    };

    if (reportIsPending) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col gap-10 items-center md:border border-[#D9D9D9] rounded-[28px] md:px-[126px] px-4 md:py-[34px] pb-[68px] w-full md:w-auto">
            <h2 className="text-[18px] font-semibold">Обновить накладную</h2>

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
                        value={formik.values.seller} // Prefill selected value
                    />
                </Form.Item>

                <Form.Item
                    label="Дата и время создания"
                    className="w-full !mb-4"
                >
                    <DatePicker
                        showTime={{ format: "HH:mm" }}
                        format="YYYY-MM-DD HH:mm"
                        className="w-full"
                        size="large"
                        placeholder={`${moment(formik.values.created_at).format(
                            "YYYY-MM-DD HH:mm"
                        )}`}
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

                <div className="flex flex-col gap-3">
                    <Button
                        htmlType="submit"
                        type="primary"
                        size={"large"}
                        className={cn("w-full !rounded-md")}
                        loading={mutation.isPending}
                    >
                        Обновить
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
                    <div
                        onClick={async () => {
                            await mutateAsync();
                        }}
                        className="flex justify-center"
                    >
                        <h2 className="underline text-[#FF0000] font-medium cursor-pointer">
                            Удалить накладную
                        </h2>
                    </div>
                </div>
            </Form>
        </div>
    );
};
