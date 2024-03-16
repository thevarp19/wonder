import { FC } from "react";
import { useParams } from "react-router-dom";
import { StoreForm } from "../components/store/StoreForm";

interface EditStorePageProps {}

export const EditStorePage: FC<EditStorePageProps> = ({}) => {
    const { storeId } = useParams();
    return (
        <div className="flex flex-col items-center">
            <h1 className="w-full max-w-sm py-4 pb-10 text-2xl font-semibold">
                Store {storeId}
            </h1>
            <StoreForm editProps={{ initialValues: {} }} />
        </div>
    );
};
