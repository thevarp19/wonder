import { useGetStores } from "@/modules/store/queries";
import { useSupply } from "@/roles/seller/redux/supply/selectors";
import { App, DatePicker, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import { FC } from "react";

import { GetStoreResponse } from "@/modules/store/types";
import { getStoreFullAddress } from "@/modules/store/utils";
import { useAppDispatch } from "@/redux/utils";
import * as actions from "@/roles/seller/redux/supply/actions";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
    weekStart: 1,
});
interface ChooseDateAndStoreStepProps {}

export const ChooseDateAndStoreStep: FC<ChooseDateAndStoreStepProps> = ({}) => {
    const { date, store } = useSupply();
    const dispatch = useAppDispatch();
    const { message } = App.useApp();
    const { data: stores, isPending } = useGetStores();
    function onDateChange(day: Dayjs, dateString: string | string[]) {
        // @ts-ignore
        const selectedStore = stores?.find((temp) => store === temp.id);
        if (!selectedStore) {
            message.error("Please choose store first");
            dispatch(actions.setDate(`${dayjs().format("DD-MM-YYYY")}`));
            return false;
        }
        let dayNumber = day.day();
        // if (dayNumber === 0) {
        //     dayNumber = 7;
        // } else {
        //     dayNumber++;
        // }
        if (
            !selectedStore.availableWorkTimes.find(
                (time) => time.dayOfWeek === dayNumber
            )
        ) {
            message.error("Store is not working on this day");
            dispatch(actions.setDate(`${dayjs().format("DD-MM-YYYY")}`));
            return false;
        }
        if (day.toDate().getTime() < new Date().getTime()) {
            message.error("You can't choose past date");
            dispatch(actions.setDate(`${dayjs().format("DD-MM-YYYY")}`));
            return false;
        }
        dispatch(actions.setDate(`${dateString}`));
    }
    function onStoreChange(store: GetStoreResponse) {
        dispatch(actions.setDate(`${dayjs().format("DD-MM-YYYY")}`));
        dispatch(actions.setStore(store));
    }

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
                        minDate={dayjs()}
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
