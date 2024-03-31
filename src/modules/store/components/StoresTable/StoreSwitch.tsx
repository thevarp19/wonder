import { Switch } from "antd";
import { FC } from "react";
import { updateStoreMutation } from "../../mutations";
import { GetStoreResponse } from "../../types";
import { mapGetStoreToUpdate } from "../../utils";

interface StoreSwitchProps {
    record: GetStoreResponse;
}

export const StoreSwitch: FC<StoreSwitchProps> = ({ record }) => {
    const { isPending, mutateAsync } = updateStoreMutation(record.id);
    return (
        <div className="flex items-center gap-2">
            <Switch
                checked={record.enabled}
                disabled={isPending}
                loading={isPending}
                onChange={async (checked) => {
                    await mutateAsync(
                        mapGetStoreToUpdate({ ...record, enabled: checked })
                    );
                }}
            />
            <span>{record.enabled ? "Active" : "Not active"}</span>
        </div>
    );
};
