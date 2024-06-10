import { SellerProfileEdit } from "@/modules/seller/SellerProfileEditForm";
import { Button, Popconfirm } from "antd";
import { FC } from "react";

interface SellerProfilePageProps {}

export const SellerProfilePage: FC<SellerProfilePageProps> = ({}) => {
    return (
        <div className="gap-4">
            <div className="w-full ">
                <h1 className="flex items-center justify-between max-w-sm mb-4 text-2xl font-semibold">
                    Редактировать профиль{" "}
                    <Popconfirm
                        title="Вы хотите сбросить пароль?"
                        description="Вы получите электронное письмо со ссылкой"
                    >
                        <Button type="primary">Сбросить пароль</Button>
                    </Popconfirm>
                </h1>
                <SellerProfileEdit />
            </div>
        </div>
    );
};
