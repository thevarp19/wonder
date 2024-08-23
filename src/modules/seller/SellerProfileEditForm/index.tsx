import { FormikInput } from "@/components/ui/FormikInput";
import { PhotoUpload } from "@/components/ui/MyPhotoUpload";
import { PhoneNumberInput } from "@/components/ui/PhoneInput";
import { useAppDispatch } from "@/redux/utils";
import { sellerLogout } from "@/roles/seller/redux/auth/actions";
import { formatPhoneNumber } from "@/utils/form.util";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Form, Popconfirm } from "antd";
import { FC } from "react";
import { deleteProfileMutation } from "../mutations";

interface SellerProfileEditProps {
    formik: any;
    mutation: any;
    isEditing: boolean;
    setIsEditing: (value: boolean) => void;
}
const removeSpaces = (value: string) => value.replace(/\s/g, "");
export const SellerProfileEdit: FC<SellerProfileEditProps> = ({
    formik,
    mutation,
    setIsEditing,
    isEditing,
}) => {
    const dispatch = useAppDispatch();
    const { mutateAsync } = deleteProfileMutation();

    const handleEditClick = () => {
        formik.setFieldValue(
            "phone_number",
            formatPhoneNumber(formik.values.phone_number)
        );
        setIsEditing(true);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
    };
    const handleSave = () => {
        formik.setFieldValue(
            "phone_number",
            removeSpaces(formik.values.phone_number)
        );
        formik.handleSubmit();
        setIsEditing(false);
    };
    return (
        <Form layout="vertical" className="w-full">
            {isEditing && (
                <div className="flex flex-col mt-5">
                    <PhotoUpload
                        formik={formik}
                        isEditing={isEditing}
                        fieldName="avatar"
                    />
                </div>
            )}
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
                    <PhoneNumberInput
                        formik={formik}
                        name="phone_number"
                        disabled={!isEditing}
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
                    <FormikInput
                        name="merchant_email"
                        formik={formik}
                        formItemProps={{ label: "Kaspi Почта", required: true }}
                        inputProps={{
                            disabled: !isEditing,
                        }}
                    />
                    <FormikInput
                        name="merchant_password"
                        formik={formik}
                        formItemProps={{
                            label: "Kaspi пароль",
                            required: true,
                        }}
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
                        onConfirm={async () => {
                            await mutateAsync();
                            dispatch(sellerLogout());
                        }}
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
