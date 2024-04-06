import { useGetStores } from "@/modules/store/queries";
import { useSupply } from "@/roles/seller/redux/supply/selectors";
import { App, DatePicker, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { FC } from "react";

import { GetStoreResponse } from "@/modules/store/types";
import { getStoreFullAddress } from "@/modules/store/utils";
import { useAppDispatch } from "@/redux/utils";
import * as actions from "@/roles/seller/redux/supply/actions";

interface ChooseDateAndStoreStepProps {}

export const ChooseDateAndStoreStep: FC<ChooseDateAndStoreStepProps> = ({}) => {
    const { date, store } = useSupply();
    const dispatch = useAppDispatch();
    const { message } = App.useApp();
    function onDateChange(day: Dayjs, dateString: string | string[]) {
        if (day.toDate().getTime() < new Date().getTime()) {
            message.error("You can't choose past date");
            return false;
        }
        dispatch(actions.setDate(`${dateString}`));
    }
    function onStoreChange(store: GetStoreResponse) {
        dispatch(actions.setStore(store));
    }
    const { data: stores, isPending } = useGetStores();

    return (
        <div>
            <h1 className="text-2xl font-semibold">
                Please choose the date and store
            </h1>
            <div className="flex gap-4 py-4">
                <div className="h-96 max-w-72 w-72 min-w-72">
                    <DatePicker
                        className="w-full"
                        open
                        format={"DD-MM-YYYY"}
                        value={date ? dayjs(date, "DD-MM-YYYY") : undefined}
                        onChange={onDateChange}
                    />
                </div>
                <Select
                    placeholder={"Choose a store"}
                    className="w-80"
                    options={stores?.map((store) => ({
                        label: getStoreFullAddress(store),
                        value: store.id,
                    }))}
                    value={store}
                    onChange={onStoreChange}
                    loading={isPending}
                    showSearch
                    filterOption={(input, option) =>
                        !!option?.label
                            ?.toString()
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                />
            </div>
        </div>
    );
};
