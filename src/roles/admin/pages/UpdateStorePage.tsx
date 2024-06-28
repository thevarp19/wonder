import { UpdateStoreForm } from "@/modules/store/components/UpdateStoreForm";
import { FC } from "react";
import { useParams } from "react-router-dom";

interface UpdateStorePageProps {}

export const UpdateStorePage: FC<UpdateStorePageProps> = ({}) => {
    const { storeId } = useParams();

    return (
        <div className="flex flex-col items-center h-max">
            <div className="flex flex-col gap-10 items-center border border-[#D9D9D9] rounded-[28px] px-[126px] py-[34px]">
                <h1 className="text-[18px] font-semibold">Склад {storeId}</h1>
                <UpdateStoreForm />
            </div>
        </div>
    );
};
