import { CreateBoxForm } from "@/modules/box/components/CreateBoxForm";
import { FC } from "react";

interface CreateBoxPageProps {}

export const CreateBoxPage: FC<CreateBoxPageProps> = ({}) => {
    return (
        <div className="flex flex-col items-center h-full">
            <CreateBoxForm />
        </div>
    );
};
