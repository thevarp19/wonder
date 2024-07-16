import { CreateStoreSellerForm } from "@/modules/store/components/CreateStoreForm/CreateStoreSellerForm";
import { FC } from "react";

export const SellerCreateStorePage: FC = () => {
    return (
        <div className="flex flex-col items-center w-full h-full">
            <CreateStoreSellerForm />
        </div>
    );
};
