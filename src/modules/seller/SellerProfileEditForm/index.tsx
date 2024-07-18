import { FormikInput } from "@/components/ui/FormikInput";
import { phoneNumberChangeHandler } from "@/utils/form.util";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Form, Popconfirm } from "antd";
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
    const handleSave = () => {
        formik.handleSubmit();
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
                        name="first_name"
                        inputProps={{
                            disabled: !isEditing,
                        }}
                    />
                    <FormikInput
                        formik={formik}
                        formItemProps={{
                            label: "Фамилия",
                            required: true,
                        }}
                        name="last_name"
                        inputProps={{
                            disabled: !isEditing,
                        }}
                    />
                    <FormikInput
                        name="phone_number"
                        formik={formik}
                        formItemProps={{
                            label: "Номер телефон",
                            required: true,
                        }}
                        inputProps={{
                            onChange: (e) => {
                                phoneNumberChangeHandler(
                                    e,
                                    formik.handleChange
                                );
                            },
                            disabled: !isEditing,
                        }}
                    />
                    <FormikInput
                        name="email"
                        formik={formik}
                        formItemProps={{ label: "E-mail", required: true }}
                        inputProps={{
                            disabled: !isEditing,
                        }}
                    />
                </div>
                <div className="flex flex-col w-full gap-5 md:w-1/3">
                    <FormikInput
                        name="kaspi_store_name"
                        formik={formik}
                        formItemProps={{
                            label: "Название магазина",
                            required: true,
                        }}
                        inputProps={{
                            disabled: !isEditing,
                        }}
                    />
                    <FormikInput
                        name="kaspi_seller_id"
                        formik={formik}
                        formItemProps={{ label: "ID Магазина", required: true }}
                        inputProps={{
                            disabled: !isEditing,
                        }}
                    />
                    <FormikInput
                        name="kaspi_token"
                        formik={formik}
                        formItemProps={{ label: "Kaspi API", required: true }}
                        inputProps={{
                            disabled: !isEditing,
                        }}
                    />
                </div>
            </div>

            {!isEditing ? (
                <div className="flex flex-col gap-4 mt-12 md:flex-row">
                    <Button
                        className="md:w-[200px] w-full h-[50px]"
                        type="primary"
                        onClick={handleEditClick}
                    >
                        Редактировать
                    </Button>
                    <Popconfirm
                        title="Удалить аккаунт"
                        cancelText="Отмена"
                        description="Вы уверены, что хотите удалить аккаунт?"
                        onConfirm={() => {}}
                    >
                        <Button danger icon={<DeleteOutlined />}>
                            Удалить аккаунт
                        </Button>
                    </Popconfirm>
                    <Button
                        className="w-full md:w-[200px] h-[50px] !border-[#EF7214] !text-[#EF7214] cursor-pointer"
                        // onClick={handleCancelClick}
                    >
                        Сбросить пароль
                    </Button>
                </div>
            ) : (
                <div className="flex flex-col gap-4 mt-12 md:flex-row">
                    <Button
                        className="w-full md:w-[200px]"
                        type="primary"
                        onClick={handleSave}
                        loading={mutation.isPending}
                        disabled={!formik.isValid}
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
