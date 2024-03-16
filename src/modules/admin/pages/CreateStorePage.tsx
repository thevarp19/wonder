import { FC } from "react";
import { StoreForm } from "../components/store/StoreForm";

interface CreateStorePageProps {}

export const CreateStorePage: FC<CreateStorePageProps> = ({}) => {
    return (
        <div className="flex flex-col items-center pb-10">
            <StoreForm />
        </div>
    );
};
