import { FormikInput } from "@/components/ui/FormikInput";
import { phoneNumberChangeHandler } from "@/utils/form.util";
import { Button, Form } from "antd";
import { FC, useState } from "react";
import { useUpdateSellerProfile } from "../forms";
import { GetSellerProfile } from "../types";

interface SellerProfileEditProps {
    data: GetSellerProfile;
}

export const SellerProfileEdit: FC<SellerProfileEditProps> = ({ data }) => {
    const { formik, mutation } = useUpdateSellerProfile(data);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };

    return (
        <Form layout="vertical" className="w-full">
            <div className="flex flex-col gap-5 mt-10 md:flex-row md:gap-10">
                <div className="flex flex-col w-full gap-5 md:w-1/3">
                    <FormikInput
                        formik={formik}
                        formItemProps={{
                            label: "Имя",
                            required: true,
                        }}
                        name="firstName"
                        inputProps={{
                            disabled: !isEditing
                        }}
                    />
                    <FormikInput
                        formik={formik}
                        formItemProps={{
                            label: "Фамилия",
                            required: true,
                        }}
                        name="lastName"
                        inputProps={{
                            disabled: !isEditing
                        }}
                    />
                    <FormikInput
                        name="phoneNumber"
                        formik={formik}
                        formItemProps={{ label: "Номер телефон", required: true }}
                        inputProps={{
                            onChange: (e) => {
                                phoneNumberChangeHandler(e, formik.handleChange);
                            },
                            disabled: !isEditing
                        }}
                    />
                    <FormikInput
                        name="tokenKaspi"
                        formik={formik}
                        formItemProps={{ label: "Kaspi API", required: true }}
                        inputProps={{
                            disabled: !isEditing
                        }}
                    />
                </div>
                <div className="flex flex-col w-full gap-5 md:w-1/3">
                    <FormikInput
                        name="login"
                        formik={formik}
                        formItemProps={{ label: "Логин", required: true }}
                        inputProps={{
                            disabled: !isEditing
                        }}
                    />
                    <FormikInput
                        name="password"
                        formik={formik}
                        formItemProps={{ label: "Пароль", required: true }}
                        inputProps={{
                            disabled: !isEditing
                        }}
                    />
                    <FormikInput
                        name="email"
                        formik={formik}
                        formItemProps={{ label: "E-mail", required: true }}
                        inputProps={{
                            disabled: !isEditing
                        }}
                    />
                </div>
            </div>
      
            {!isEditing ? (
                <Button
                    className="md:w-[200px] w-full h-[50px] mt-12"
                    type="primary"
                    onClick={handleEditClick}
                >
                    Редактировать
                </Button>
            ) : (
                <div className="flex flex-col gap-4 mt-12 md:flex-row">
                    <Button
                        className="w-full md:w-[200px]"
                        type="primary"
                        onClick={() => {
                            formik.handleSubmit();
                            setIsEditing(false);
                        }}
                        loading={mutation.isPending}
                    >
                        Сохранить
                    </Button>
                    <Button
                        className="w-full md:w-[200px] h-[50px]"
                        onClick={handleCancelClick}
                    >
                        Отмена
                    </Button>
                </div>
            )}
        </Form>
    );
    
};
