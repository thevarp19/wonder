import { FormikInput } from "@/components/ui/FormikInput";
import { phoneNumberChangeHandler } from "@/utils/form.util";
import { Button, Form } from "antd";
import { FC } from "react";
import { useUpdateSellerProfile } from "../forms";
import { useGetSellerProfile } from "../queries";

interface SellerProfileEditProps {}

export const SellerProfileEdit: FC<SellerProfileEditProps> = ({}) => {
    const { data } = useGetSellerProfile();
    const { formik, mutation } = useUpdateSellerProfile(data);
    return (
        <div>
            <Form layout="vertical" className="w-full max-w-sm">
                <FormikInput
                    formik={formik}
                    formItemProps={{
                        label: "Name",
                        required: true,
                    }}
                    name="firstName"
                />
                <FormikInput
                    formik={formik}
                    formItemProps={{
                        label: "Surname",
                        required: true,
                    }}
                    name="lastName"
                />
                <FormikInput
                    name="phoneNumber"
                    formik={formik}
                    formItemProps={{ label: "Phone", required: true }}
                    inputProps={{
                        onChange: (e) => {
                            phoneNumberChangeHandler(e, formik.handleChange);
                        },
                    }}
                />

                <FormikInput
                    name="sellerName"
                    formik={formik}
                    formItemProps={{ label: "Shop name", required: true }}
                />
                <FormikInput
                    name="sellerId"
                    formik={formik}
                    formItemProps={{ label: "Shop ID", required: true }}
                />
                <FormikInput
                    name="tokenKaspi"
                    formik={formik}
                    formItemProps={{ label: "API Kaspi token", required: true }}
                />

                <Button
                    type="primary"
                    onClick={() => {
                        formik.handleSubmit();
                    }}
                    loading={mutation.isPending}
                    className="w-full"
                >
                    Update
                </Button>
            </Form>
        </div>
    );
};
