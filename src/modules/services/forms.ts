import { useFormik } from "formik";

import { useEffect, useState } from "react";
import { calculateMutation, updateServiceParamsMutation } from "./mutations";
import {
    CalculatorRequest,
    GetServiceParamsItems,
    UpdateServiceParamsRequest,
} from "./types";

export const useServiceParams = (
    initialValues: GetServiceParamsItems,
    id: number
) => {
    const [isDirty, setIsDirty] = useState(false);
    const mutation = updateServiceParamsMutation(id);
    const formik = useFormik<UpdateServiceParamsRequest>({
        initialValues: {
            courier_package: false,
            label_caution_class: false,
            label_manipulation_sign: false,
            label_flammable: false,
            label_careful_rechargeable_battery: false,
            adhesive_tape_for_fragile_goods: false,
            number_of_labels_of_bubble_wrap: 0,
            number_of_labels_of_stretch_film: 0,
            need_super_safe: false,
        },

        onSubmit: handleSubmit,
    });
    function handleDirty() {
        setIsDirty(true);
    }
    useEffect(() => {
        if (initialValues) {
            formik.resetForm({
                values: initialValues,
            });
        }
    }, [initialValues]);

    async function handleSubmit() {
        await mutation.mutateAsync(formik.values);
        setIsDirty(false);
    }

    return { formik, mutation, isDirty, handleDirty };
};
export const useCalculateParams = () => {
    const mutation = calculateMutation();
    const formik = useFormik<CalculatorRequest[]>({
        initialValues: [
            {
                parameters: {
                    courier_package: false,
                    label_caution_class: false,
                    label_manipulation_sign: false,
                    label_flammable: false,
                    label_careful_rechargeable_battery: false,
                    adhesive_tape_for_fragile_goods: false,
                    number_of_labels_of_bubble_wrap: 0,
                    number_of_labels_of_stretch_film: 0,
                    need_super_safe: false,
                },
                sizes: {
                    length: 0,
                    width: 0,
                    height: 0,
                    weight: 0,
                },
                days: 0,
                quantity: 0,
            },
        ],

        onSubmit: handleSubmit,
    });

    async function handleSubmit() {
        await mutation.mutateAsync(formik.values);
    }

    return { formik, mutation };
};
