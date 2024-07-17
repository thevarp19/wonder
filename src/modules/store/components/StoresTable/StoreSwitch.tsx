import { Switch } from "antd";
import { FC } from "react";
import { updateStoreStatusMutation } from "../../mutations";
import { GetStoreResponse } from "../../types";

interface StoreSwitchProps {
    record: GetStoreResponse;
}

export const StoreSwitch: FC<StoreSwitchProps> = ({ record }) => {
    const { isPending, mutateAsync } = updateStoreStatusMutation(
        record.warehouse.id
    );
    return (
        <div className="flex items-center gap-2">
            <Switch
                checked={record.enabled}
                disabled={isPending}
                loading={isPending}
                onChange={async (checked) => {
                    await mutateAsync({ enabled: checked });
                }}
            />
            <span>{record.enabled ? "Активно" : "Неактивно"}</span>
        </div>
    );
};
