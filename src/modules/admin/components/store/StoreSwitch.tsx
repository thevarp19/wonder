import { App, Switch } from "antd";
import { FC, useState } from "react";
import { updateStore } from "../../api/shared";
import { GetStoresWithDetailsResponse } from "../../types/api";

interface StoreSwitchProps {
    record: GetStoresWithDetailsResponse;
}

export const StoreSwitch: FC<StoreSwitchProps> = ({ record }) => {
    const { message } = App.useApp();
    const [loading, setLoading] = useState(false);
    return (
        <div className="flex items-center gap-2">
            <Switch
                checked={record.enabled}
                disabled={loading}
                loading={loading}
                onChange={async (e) => {
                    try {
                        setLoading(true);
                        await updateStore(`${record.id}`, {
                            enabled: e,
                            dayOfWeekWorks: record.availableWorkTimes.map(
                                (time) => ({
                                    numericDayOfWeek: time.dayOfWeek,
                                    openTime: time.openTime,
                                    closeTime: time.closeTime,
                                })
                            ),
                        });
                        message.success("Store updated successfully");
                    } catch (error) {
                        message.error("Failed to update store");
                    } finally {
                        setLoading(false);
                    }
                }}
            />
            <span>{record.enabled ? "Active" : "Not active"}</span>
        </div>
    );
};
