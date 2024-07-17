import { App, Switch } from "antd";
import { FC } from "react";
import { updateStoreStatusSellerMutation } from "../../mutations";
import { GetStoreSellerResponse } from "../../types";

interface StoreSwitchProps {
    record: GetStoreSellerResponse;
}

export const StoreSellerSwitch: FC<StoreSwitchProps> = ({ record }) => {
    const { isPending, mutateAsync } = updateStoreStatusSellerMutation(
        record?.seller_warehouse?.id
    );
    const { message } = App.useApp();
    const handleChange = async (checked: boolean) => {
        if (record.wonder_warehouse === null) {
            // Seller warehouse without admin warehouse
            await mutateAsync({ enabled: checked });
        } else if (record.wonder_warehouse.enabled === false) {
            // Admin warehouse is disabled, show message
            message.error("Склад отключен. Невозможно изменить статус.");
        } else if (record.wonder_warehouse.enabled === true) {
            // Admin warehouse is enabled, allow status change
            await mutateAsync({ enabled: checked });
        }
    };
    return (
        <div className="flex items-center gap-2">
            <Switch
                checked={record?.seller_warehouse?.enabled}
                disabled={isPending}
                loading={isPending}
                onChange={handleChange}
            />
            <span>
                {record?.seller_warehouse?.enabled ? "Активно" : "Неактивно"}
            </span>
        </div>
    );
};
