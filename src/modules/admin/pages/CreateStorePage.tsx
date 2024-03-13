import { FC } from "react";
import { CreateStoreForm } from "../components/store/CreateStoreForm";

interface CreateStorePageProps {}

export const CreateStorePage: FC<CreateStorePageProps> = ({}) => {
    return (
        <div className="flex flex-col items-center">
            <CreateStoreForm />
        </div>
    );
};
