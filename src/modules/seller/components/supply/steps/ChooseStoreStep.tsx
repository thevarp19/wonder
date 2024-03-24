import { useGetStoresWithDetails } from "@/modules/admin/hooks/useGetStoresWithDetails";
import { Select } from "antd";
import { FC } from "react";

interface ChooseStoreStepProps {}

export const ChooseStoreStep: FC<ChooseStoreStepProps> = ({}) => {
    const { data: stores, isPending } = useGetStoresWithDetails();
    return (
        <div>
            <Select
                placeholder={"Choose a store"}
                className="w-80"
                options={stores?.map((store) => ({
                    label: store.kaspiId,
                    value: store.id,
                }))}
                loading={isPending}
            />
        </div>
    );
};
