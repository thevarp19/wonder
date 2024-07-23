import { profileImage } from "@/assets";
import { Image } from "@/components/ui/Image";
import { Loading } from "@/components/ui/Loading";
import { useUpdateSellerProfile } from "@/modules/seller/forms";
import { useGetSellerProfile } from "@/modules/seller/queries";
import { SellerProfileEdit } from "@/modules/seller/SellerProfileEditForm";
import { FC, useState } from "react";

interface SellerProfilePageProps {}

export const SellerProfilePage: FC<SellerProfilePageProps> = ({}) => {
    const { data, isLoading, isError } = useGetSellerProfile();
    // const { message } = App.useApp();
    const { formik, mutation } = useUpdateSellerProfile(data);
    const [isEditing, setIsEditing] = useState(false);

    if (isLoading) {
        return <Loading />;
    }

    if (isError || !data) {
        return <div>Ошибка при загрузке данных профиля</div>;
    }

    return (
        <div className="sm:pb-0 pb-[68px]">
            <h1 className="text-[18px] font-[600]">Профиль</h1>
            {!isEditing && (
                <div className="flex mt-5 gap-7">
                    <Image
                        className="w-[100px] h-[100px] rounded-full"
                        src={data.avatar || profileImage}
                        alt="profile"
                    />

                    <div className="flex flex-col justify-center h-auto">
                        <h2 className="text-[20px] font-[600]">
                            {data.first_name} {data.last_name}
                        </h2>
                        <p className="text-[16px] font-[500] text-[#4B4B4B]">
                            ID: {data.kaspi_seller_id}
                        </p>
                    </div>
                </div>
            )}

            <SellerProfileEdit
                formik={formik}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                mutation={mutation}
            />
        </div>
    );
};
