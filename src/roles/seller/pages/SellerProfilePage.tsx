import { axiosAuthorized } from "@/lib/axios";
import { SellerProfileEdit } from "@/modules/seller/SellerProfileEditForm";
import { Button, Popconfirm } from "antd";
import { FC } from "react";

interface SellerProfilePageProps {}

export const SellerProfilePage: FC<SellerProfilePageProps> = ({}) => {
    const handleClick = () => {
        axiosAuthorized
            .get("/api/products/xml")
            .then((response) => {
                console.log("XML data:", response.data);
            })
            .catch((error) => {
                console.error("Error fetching XML:", error);
            });
    };
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
                <div className="flex items-center gap-5 py-4">
                    <Button
                        type="primary"
                        onClick={handleClick}
                        className="px-4 py-2 font-bold text-white bg-orange-500 rounded-r-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                    >
                        Сгенерировать XML
                    </Button>
                    <h2>Последнее обновление 12.06.2024 19:29</h2>
                </div>
                <SellerProfileEdit />
            </div>
        </div>
    );
};
