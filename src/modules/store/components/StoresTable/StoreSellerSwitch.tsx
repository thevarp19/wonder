import { App, Switch } from "antd";
import { FC, useEffect, useState } from "react";
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
    const [checked, setChecked] = useState(record?.seller_warehouse?.enabled);
    useEffect(() => {
        setChecked(record?.seller_warehouse?.enabled);
    }, [record?.seller_warehouse?.enabled]);
    const handleChange = async (checked: boolean) => {
        setChecked(checked);

        if (record?.seller_warehouse === null) {
            message.error(
                "Активируйте склад. Зайдите в редактирование и напишите Kaspi ID из кабинета продавца."
            );
            setChecked(false);
            return;
        }
        if (record?.wonder_warehouse === null) {
            await mutateAsync({ enabled: checked });
            return;
        }
        if (record?.wonder_warehouse?.enabled === false) {
            message.error("Склад не активен. Невозможно изменить статус.");
            setChecked(record?.seller_warehouse?.enabled);
            return;
        }
        if (record?.wonder_warehouse?.enabled === true) {
            await mutateAsync({ enabled: checked });
        }
    };

    return (
        <div className="flex items-center gap-2">
            <Switch
                checked={checked}
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
