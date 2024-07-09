import { useGetStores } from "@/modules/store/queries";
import { useSupply } from "@/roles/seller/redux/supply/selectors";
import { App, DatePicker, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import { FC, useEffect } from "react";

import { myLocalStorage } from "@/lib/storage/browserStorage";
import { useGetBoxes } from "@/modules/box/queries";
import { GetStoreResponse } from "@/modules/store/types";
import { getStoreFullAddress } from "@/modules/store/utils";
import { useAppDispatch } from "@/redux/utils";
import * as actions from "@/roles/seller/redux/supply/actions";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
dayjs.extend(updateLocale);
dayjs.updateLocale("ru", {
    // Update locale to Russian
    weekStart: 1,
});
interface ChooseDateAndStoreStepProps {}

export const ChooseDateAndStoreStep: FC<ChooseDateAndStoreStepProps> = ({}) => {
    const { date, store } = useSupply();
    const dispatch = useAppDispatch();
    const { message } = App.useApp();
    const { data: stores, isPending } = useGetStores();
    //@ts-ignore
    const { data: boxes } = useGetBoxes(store);
    useEffect(() => {
        myLocalStorage?.set("boxes", boxes);
    }, [boxes]);
    function onDateChange(day: Dayjs, dateString: string | string[]) {
        // @ts-ignore
        const selectedStore = stores?.find((temp) => store === temp.id);
        if (!selectedStore) {
            message.error("Пожалуйста, выберите склад");
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
            message.error("Склад не работает в этот день");
            dispatch(actions.setDate(`${dayjs().format("DD-MM-YYYY")}`));
            return false;
        }
        if (day.toDate().getTime() < new Date().getTime()) {
            message.error("Вы не можете выбрать прошедшую дату");
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
                Пожалуйста, выберите дату и склад
            </h1>
            <div className="flex gap-4 py-4">
                <Select
                    placeholder={"Выберите склад"}
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
                <div className="h-96 max-w-72 w-72 min-w-72">
                    <DatePicker
                        className="w-full"
                        minDate={dayjs()}
                        format={"DD-MM-YYYY"}
                        placeholder="Выберите дату"
                        value={date ? dayjs(date, "DD-MM-YYYY") : undefined}
                        onChange={onDateChange}
                    />
                </div>
            </div>
        </div>
    );
};
