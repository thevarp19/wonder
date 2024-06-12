import {
    requiredBooleanSchema,
    requiredNumberSchema,
    requiredStringSchema,
} from "@/lib/validations/shared";
import { useFormik } from "formik";
import { useEffect } from "react";
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
import { mapGetStoreToUpdate } from "./utils";

const createStoreSchema = Yup.object().shape({
    kaspiId: requiredStringSchema(),
    cityId: requiredNumberSchema(),
    streetName: requiredStringSchema(),
    apartment: requiredStringSchema(),
});

export const useCreateStore = () => {
    const mutation = createStoreMutation();

    const formik = useFormik<CreateStoreRequest>({
        initialValues: {
            kaspiId: "",
            cityId: -1,
            streetName: "",
            streetNumber: "",
            latitude: 0,
            longitude: 0,
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
    streetName: requiredStringSchema(),
    enabled: requiredBooleanSchema(),
});

export const useUpdateStore = (
    storeId: number,
    initialValues: GetStoreResponse | undefined
) => {
    const mutation = updateStoreMutation(storeId);

    const formik = useFormik<UpdateStoreRequest>({
        initialValues: {
            kaspiId: "",
            cityId: -1,
            streetName: "",
            streetNumber: "",
            latitude: 0,
            longitude: 0,
            enabled: false,
            dayOfWeekWorks: [],
        },
        validationSchema: updateStoreSchema,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: handleSubmit,
    });

    useEffect(() => {
        if (initialValues) {
            formik.resetForm({
                values: mapGetStoreToUpdate(initialValues),
            });
        }
    }, [initialValues]);

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
        formik.resetForm();
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
