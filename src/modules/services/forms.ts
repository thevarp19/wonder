import { useFormik } from "formik";

import { useEffect, useState } from "react";
import { updateServiceParamsMutation } from "./mutations";
import { GetServiceParamsItems, UpdateServiceParamsRequest } from "./types";

export const useServiceParams = (
    initialValues: GetServiceParamsItems,
    id: number
) => {
    const [isDirty, setIsDirty] = useState(false);
    const mutation = updateServiceParamsMutation(id);
    const formik = useFormik<UpdateServiceParamsRequest>({
        initialValues: {
            box: false,
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
