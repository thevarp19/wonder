import { UpdateStoreForm } from "@/modules/store/components/UpdateStoreForm";
import { FC } from "react";
import { useParams } from "react-router-dom";
interface UpdateStorePageProps {}

export const UpdateStorePage: FC<UpdateStorePageProps> = ({}) => {
    const { storeId } = useParams();

    return (
        <div className="flex flex-col items-center pb-10">
            <h1 className="w-full max-w-sm py-4 pb-10 text-2xl font-semibold">
                Store {storeId}
            </h1>
            <UpdateStoreForm />
        </div>
    );
};
