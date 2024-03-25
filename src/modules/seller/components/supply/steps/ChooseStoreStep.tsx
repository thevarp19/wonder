import { myLocalStorage } from "@/lib/storage/browserStorage";
import { useGetBoxes } from "@/modules/admin/hooks/useGetBoxes";
import { useGetStoresWithDetails } from "@/modules/admin/hooks/useGetStoresWithDetails";
import { cn } from "@/utils/shared.util";
import { App, Button, Select } from "antd";
import { FC, useState } from "react";

interface ChooseStoreStepProps {}

export const ChooseStoreStep: FC<ChooseStoreStepProps> = ({}) => {
    const { data: stores, isPending } = useGetStoresWithDetails();
    const { data: boxes, isPending: isBoxesPending } = useGetBoxes();
    const [storeId, setStoreId] = useState<string | undefined>(
        myLocalStorage?.get("supply-store") || undefined
    );
    const [boxId, setBoxId] = useState<string | undefined>(
        myLocalStorage?.get("supply-box") || undefined
    );
    const { message } = App.useApp();
    return (
        <div className="space-x-4">
            <Select
                placeholder={"Choose a store"}
                className="w-80"
                options={stores?.map((store) => ({
                    label: store.kaspiId,
                    value: store.id,
                }))}
                value={storeId}
                onChange={(v) => setStoreId(v)}
                loading={isPending}
            />
            <Select
                placeholder={"Choose a box type"}
                className="w-80"
                options={boxes?.map((box) => ({
                    label: `${box.name} ${box.description}`,
                    value: box.id,
                }))}
                value={boxId}
                onChange={(v) => setBoxId(v)}
                loading={isBoxesPending}
            />
            <div className={cn("flex justify-end gap-4")}>
                <Button
                    danger
                    size="large"
                    type="primary"
                    className="mb-4"
                    onClick={() => {
                        myLocalStorage?.remove("supply-store");
                        myLocalStorage?.remove("supply-box");
                        message.success("Store removed successfully");
                        setStoreId(undefined);
                        setBoxId(undefined);
                    }}
                >
                    Delete
                </Button>
                <Button
                    size="large"
                    type="primary"
                    className="mb-4"
                    onClick={() => {
                        myLocalStorage?.set("supply-store", storeId);
                        myLocalStorage?.set("supply-box", boxId);
                        message.success("Store saved successfully");
                    }}
                >
                    Save
                </Button>
            </div>
        </div>
    );
};
