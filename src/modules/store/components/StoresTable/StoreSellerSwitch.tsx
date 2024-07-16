import { Switch } from "antd";
import { FC } from "react";
import { updateStoreMutation } from "../../mutations";
import { SellerWarehouse } from "../../types";

interface StoreSwitchProps {
    record: SellerWarehouse | null;
}

export const StoreSellerSwitch: FC<StoreSwitchProps> = ({ record }) => {
    const {
        isPending,
        //  mutateAsync
    } = updateStoreMutation(record?.id ?? 0);
    return (
        <div className="flex items-center gap-2">
            <Switch
                checked={record?.enabled ?? false}
                disabled={isPending}
                loading={isPending}
                onChange={async () =>
                    // checked

                    {
                        // await mutateAsync(
                        //     mapGetStoreToUpdate({ ...record, enabled: checked })
                        // );
                    }
                }
            />
            <span>{record?.enabled ? "Активно" : "Неактивно"}</span>
        </div>
    );
};
