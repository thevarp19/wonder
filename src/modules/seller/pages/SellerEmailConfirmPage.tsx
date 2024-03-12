import { FormikInput } from "@/components/ui/FormikInput";
import { cn } from "@/utils/shared.util";
import { Button, Form } from "antd";
import { FC } from "react";
import { useEmailConfirm } from "../hooks/useEmailConfirm";

interface SellerEmailConfirmPageProps {}

export const SellerEmailConfirmPage: FC<SellerEmailConfirmPageProps> = ({}) => {
    const { formik, mutation } = useEmailConfirm();
    return (
        <div className="flex flex-col items-center mt-[10vh]">
            <section className="flex flex-col items-center w-full max-w-sm">
                <h1 className="py-5 text-2xl font-semibold">
                    Confirm your email
                </h1>
                <Form
                    onFinish={formik.submitForm}
                    className="flex flex-col items-center w-full max-w-sm gap-2 px-10"
                >
                    <FormikInput
                        name="code"
                        formik={formik}
                        inputProps={{
                            placeholder: "Code",
                            size: "large",
                        }}
                    />
                    <Button
                        htmlType="submit"
                        type="primary"
                        size={"large"}
                        className={cn("w-full")}
                        loading={mutation.isPending}
                    >
                        Confirm
                    </Button>
                </Form>
            </section>
        </div>
    );
};
