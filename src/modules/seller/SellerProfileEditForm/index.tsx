import { FormikInput } from "@/components/ui/FormikInput";
import { phoneNumberChangeHandler } from "@/utils/form.util";
import { Button, Form } from "antd";
import { FC } from "react";
import { useUpdateSellerProfile } from "../forms";
import { GetSellerProfile } from "../types";

interface SellerProfileEditProps {
    data: GetSellerProfile;
}

export const SellerProfileEdit: FC<SellerProfileEditProps> = ({ data }) => {
    const { formik, mutation } = useUpdateSellerProfile(data);
    return (
        <div>
            <Form layout="vertical" className="w-full max-w-sm">
                <FormikInput
                    formik={formik}
                    formItemProps={{
                        label: "Имя",
                        required: true,
                    }}
                    name="firstName"
                />
                <FormikInput
                    formik={formik}
                    formItemProps={{
                        label: "Фамилия",
                        required: true,
                    }}
                    name="lastName"
                />
                <FormikInput
                    name="phoneNumber"
                    formik={formik}
                    formItemProps={{ label: "Телефон", required: true }}
                    inputProps={{
                        onChange: (e) => {
                            phoneNumberChangeHandler(e, formik.handleChange);
                        },
                    }}
                />

                <FormikInput
                    name="sellerName"
                    formik={formik}
                    formItemProps={{
                        label: "Название склада",
                        required: true,
                    }}
                />
                <FormikInput
                    name="sellerId"
                    formik={formik}
                    formItemProps={{
                        label: "Идентификатор склада",
                        required: true,
                    }}
                />
                <FormikInput
                    name="tokenKaspi"
                    formik={formik}
                    formItemProps={{ label: "API токен Kaspi", required: true }}
                />

                <Button
                    type="primary"
                    onClick={() => {
                        formik.handleSubmit();
                    }}
                    loading={mutation.isPending}
                    className="w-full"
                >
                    Обновить
                </Button>
            </Form>
        </div>
    );
};
