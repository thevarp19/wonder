import { profileImage } from "@/assets";
import { Image } from "@/components/ui/Image";
import { Loading } from "@/components/ui/Loading";
import { useGetSellerProfile } from "@/modules/seller/queries";
import { SellerProfileEdit } from "@/modules/seller/SellerProfileEditForm";
import { Button} from "antd";
import { FC } from "react";

interface SellerProfilePageProps {}

export const SellerProfilePage: FC<SellerProfilePageProps> = ({}) => {
    const { data, isLoading, isError } = useGetSellerProfile();
    // const { message } = App.useApp();

    if (isLoading) {
        return <Loading/>
    }

    if (isError || !data) {
         return <div>Ошибка при загрузке данных профиля</div>;
    }

    return (
        <div className="sm:pb-0 pb-[68px]">
            <h1 className="text-[18px] font-[600]">Профиль</h1>
            <div className="flex mt-5 gap-7">
                <Image
                    className="w-[100px] h-[100px]"
                    src={profileImage}
                    alt="profile"
                />
                <div className="flex flex-col justify-center h-auto">
                    <h2 className="text-[20px] font-[600]">QIT</h2>
                    <p className="text-[16px] font-[500] text-[#4B4B4B]">
                        ID:00101299323
                    </p>
                </div>
            </div>
            <Button
                style={{
                    border: "none",
                    color: "#4B4B4B",
                    fontSize: "12px",
                    fontWeight: 500,
                    padding: 0,
                }}
                className="absolute bottom-0 left-2"
            >
                <span className="underline underline-offset-[3px]">
                    Поменять фото
                </span>
            </Button>
            <SellerProfileEdit data={data}/>
        </div>
    );
};
