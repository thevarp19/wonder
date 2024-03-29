import { FormikInput } from "@/components/ui/FormikInput";
import { cn } from "@/utils/shared.util";
import { Button, Form } from "antd";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { CitiesInput } from "../components/store/CitiesInput";
import { WorkingTimeInput } from "../components/store/WorkingTimeInput";
import { useGetStoresWithDetails } from "../hooks/useGetStoresWithDetails";
import { useUpdateStore } from "../hooks/useUpdateStore";

interface EditStorePageProps {}

export const EditStorePage: FC<EditStorePageProps> = ({}) => {
    const { storeId } = useParams();
    const { data: storeDetails } = useGetStoresWithDetails();
    const { formik, mutation } = useUpdateStore(
        storeDetails?.find((item) => `${item.id}` == storeId)
    );
    return (
        <div className="flex flex-col items-center pb-10">
            <h1 className="w-full max-w-sm py-4 pb-10 text-2xl font-semibold">
                Store {storeId}
            </h1>
            <Form
                onFinish={formik.submitForm}
                layout="vertical"
                className="flex flex-col w-full max-w-sm gap-2 px-10"
            >
                <FormikInput
                    name="kaspiId"
                    formik={formik}
                    formItemProps={{
                        label: "Kaspi ID",
                    }}
                    inputProps={{
                        size: "large",
                    }}
                />
                <FormikInput
                    name="name"
                    formik={formik}
                    formItemProps={{
                        label: "Name",
                    }}
                    inputProps={{
                        size: "large",
                    }}
                />
                <Form.Item label="City" className="w-full">
                    <CitiesInput
                        className=""
                        size="large"
                        onSelect={(_, option) => {
                            formik.setFieldValue("cityId", option.value);
                        }}
                    />
                </Form.Item>
                <FormikInput
                    name="street"
                    formik={formik}
                    formItemProps={{
                        label: "Street",
                    }}
                    inputProps={{
                        size: "large",
                    }}
                />
                <FormikInput
                    name="apartment"
                    formik={formik}
                    formItemProps={{
                        label: "Apartment number",
                    }}
                    inputProps={{
                        size: "large",
                    }}
                />
                <Form.Item label={"Working time"} className={cn("w-max")}>
                    <WorkingTimeInput
                        onChange={(values) => {
                            formik.setFieldValue("dayOfWeekWorks", values);
                        }}
                    />
                </Form.Item>

                <Button
                    htmlType="submit"
                    type="primary"
                    size={"large"}
                    className={cn("w-full")}
                    loading={mutation.isPending}
                >
                    {"Update"}
                </Button>
            </Form>
        </div>
    );
};
