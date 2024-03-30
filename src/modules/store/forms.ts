import {
    requiredBooleanSchema,
    requiredNumberSchema,
    requiredStringSchema,
} from "@/lib/validations/shared";
import { useFormik } from "formik";

import * as Yup from "yup";
import {
    bindBoxToStoreMutation,
    createStoreMutation,
    removeBoxFromStoreMutation,
    updateStoreMutation,
} from "./mutations";
import {
    CreateStoreRequest,
    GetStoreResponse,
    UpdateStoreRequest,
} from "./types";

const createStoreSchema = Yup.object().shape({
    kaspiId: requiredStringSchema(),
    cityId: requiredNumberSchema(),
    street: requiredStringSchema(),
    apartment: requiredStringSchema(),
});

export const useCreateStore = () => {
    const mutation = createStoreMutation();

    const formik = useFormik<CreateStoreRequest>({
        initialValues: {
            kaspiId: "",
            cityId: -1,
            street: "",
            apartment: "",
            dayOfWeekWorks: [],
        },
        validationSchema: createStoreSchema,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: handleSubmit,
    });

    async function handleSubmit() {
        await mutation.mutateAsync(formik.values);
    }

    return { formik, mutation };
};

const updateStoreSchema = Yup.object().shape({
    kaspiId: requiredStringSchema(),
    cityId: requiredNumberSchema(),
    street: requiredStringSchema(),
    apartment: requiredStringSchema(),
    enabled: requiredBooleanSchema(),
});

export const useUpdateStore = (
    storeId: string,
    initialValues: GetStoreResponse
) => {
    const mutation = updateStoreMutation(storeId);

    const formik = useFormik<UpdateStoreRequest>({
        initialValues: {
            kaspiId: initialValues.kaspiId,
            cityId: initialValues.city.id,
            street: initialValues.street,
            apartment: initialValues.address,
            enabled: initialValues.enabled,
            dayOfWeekWorks: initialValues.availableWorkTimes.map((item) => ({
                numericDayOfWeek: item.dayOfWeek,
                openTime: item.openTime,
                closeTime: item.closeTime,
            })),
        },
        validationSchema: updateStoreSchema,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: handleSubmit,
    });

    async function handleSubmit() {
        await mutation.mutateAsync(formik.values);
    }

    return { formik, mutation };
};

const boxToStoreSchema = Yup.object().shape({
    boxId: requiredStringSchema(),
});

export const useBindBoxToStore = (storeId: string) => {
    const mutation = bindBoxToStoreMutation();

    const formik = useFormik({
        initialValues: {
            boxId: "",
        },
        validationSchema: boxToStoreSchema,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: handleSubmit,
    });

    async function handleSubmit() {
        await mutation.mutateAsync({ storeId, boxId: formik.values.boxId });
    }

    return { formik, mutation };
};

export const useRemoveBoxFromStore = (storeId: string) => {
    const mutation = removeBoxFromStoreMutation();

    const formik = useFormik({
        initialValues: {
            boxId: "",
        },
        validationSchema: boxToStoreSchema,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: handleSubmit,
    });

    async function handleSubmit() {
        await mutation.mutateAsync({ storeId, boxId: formik.values.boxId });
    }

    return { formik, mutation };
};
