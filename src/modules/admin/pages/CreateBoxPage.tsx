import { FC } from "react";
import { CreateBoxForm } from "../components/boxes/CreateBoxForm";

interface CreateBoxPageProps {}

export const CreateBoxPage: FC<CreateBoxPageProps> = ({}) => {
    return (
        <div className="flex flex-col items-center pb-10">
            <CreateBoxForm />
        </div>
    );
};
