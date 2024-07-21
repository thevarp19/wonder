import { useGetAvailableStores } from "@/modules/store/queries";
import { useSupply } from "@/roles/seller/redux/supply/selectors";
import { App, DatePicker, Select } from "antd";
import dayjs, { Dayjs } from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";
import { FC, useEffect } from "react";

import { myLocalStorage } from "@/lib/storage/browserStorage";
import { useGetBoxes } from "@/modules/box/queries";
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
    const { data: stores, isPending } = useGetAvailableStores();

    const { data: boxes } = useGetBoxes(store?.warehouse.id ?? null);

    useEffect(() => {
        if (boxes) {
            myLocalStorage?.set("boxes", boxes);
        }
    }, [boxes]);

    function onDateChange(day: Dayjs, dateString: string | string[]) {
        const selectedStore = stores?.find((temp) => store?.id === temp.id);
        if (!selectedStore) {
            message.error("Пожалуйста, выберите склад");
            dispatch(actions.setDate(`${dayjs().format("DD-MM-YYYY")}`));
            return false;
        }
        let dayNumber = day.day();
        if (
            !selectedStore.warehouse.operating_modes.find(
                (time) => time.day === dayNumber
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

    function onStoreChange(value: number) {
        const selectedStore = stores?.find(
            (store) => store.warehouse.id === value
        );
        if (selectedStore) {
            dispatch(actions.setDate(`${dayjs().format("DD-MM-YYYY")}`));
            dispatch(actions.setStore(selectedStore));
        }
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
                        label: store.warehouse.formatted_address,
                        value: store.warehouse.id,
                    }))}
                    value={store?.warehouse.id}
                    onChange={(value) => onStoreChange(value as number)}
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
