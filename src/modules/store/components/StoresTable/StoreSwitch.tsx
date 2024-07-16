import { Switch } from "antd";
import { FC } from "react";
import { GetStoreResponse } from "../../types";

interface StoreSwitchProps {
    record: GetStoreResponse;
}

export const StoreSwitch: FC<StoreSwitchProps> = ({ record }) => {
    // const { isPending, mutateAsync } = updateStoreMutation(record.warehouse.id);
    return (
        <div className="flex items-center gap-2">
            <Switch
                checked={record.enabled}
                disabled={false}
                loading={false}
                // onChange={async (checked) => {
                //     await mutateAsync(
                //         mapGetStoreToUpdate({ ...record, enabled: checked })
                //     );
                // }}
            />
            <span>{record.enabled ? "Активно" : "Неактивно"}</span>
        </div>
    );
};
