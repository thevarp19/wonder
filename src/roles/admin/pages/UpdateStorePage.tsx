import { UpdateStoreForm } from "@/modules/store/components/UpdateStoreForm";
import { FC } from "react";
import { useParams } from "react-router-dom";

interface UpdateStorePageProps {}

export const UpdateStorePage: FC<UpdateStorePageProps> = ({}) => {
    const { storeId } = useParams();

    return (
        <div className="flex flex-col items-center w-full h-full">
            <div className="flex flex-col gap-10 items-center md:border border-[#D9D9D9] rounded-[28px] md:px-[126px] px-4 md:py-[34px] pb-[68px] w-full md:w-auto">
                <h1 className="text-[18px] font-semibold">Склад {storeId}</h1>
                <UpdateStoreForm />
            </div>
        </div>
    );
};
