import { Switch } from "antd";
import { FC } from "react";
import { updateStoreSupplyStatusMutation } from "../../mutations";
import { GetStoreResponse } from "../../types";

interface StoreSwitchProps {
    record: GetStoreResponse;
}

export const StoreSupplySwitch: FC<StoreSwitchProps> = ({ record }) => {
    const { isPending, mutateAsync } = updateStoreSupplyStatusMutation(
        record.warehouse.id
    );
    return (
        <div className="flex items-center gap-2">
            <Switch
                checked={record.can_receive_supply}
                disabled={isPending}
                loading={isPending}
                onChange={async (checked) => {
                    await mutateAsync({ can_receive_supply: checked });
                }}
            />
            <span>{record.can_receive_supply ? "Активно" : "Неактивно"}</span>
        </div>
    );
};
