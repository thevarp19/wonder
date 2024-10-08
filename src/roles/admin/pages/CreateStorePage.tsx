import { CreateStoreForm } from "@/modules/store/components/CreateStoreForm";
import { FC } from "react";

interface CreateStorePageProps {}

export const CreateStorePage: FC<CreateStorePageProps> = ({}) => {
    return (
        <div className="flex flex-col items-center w-full h-full">
            <CreateStoreForm />
        </div>
    );
};
