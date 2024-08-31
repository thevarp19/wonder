import {
    kaspiWarehouseIdSchema,
    requiredStringSchema,
} from "@/lib/validations/shared";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import {
    activateStoreSellerMutation,
    bindBoxToStoreMutation,
    createStoreMutation,
    createStoreSellerMutation,
    removeBoxFromStoreMutation,
    updateStoreMutation,
    updateStoreSellerMutation,
} from "./mutations";
import {
    ActivateStoreSellerRequest,
    CreateStoreRequest,
    CreateStoreSellerRequest,
    GetDetailSellerStoreResponse,
    GetDetailStoreResponse,
    UpdateStoreRequest,
    UpdateStoreSellerRequest,
} from "./types";
import { mapGetSellerStoreToUpdate, mapGetStoreToUpdate } from "./utils";

const createStoreSchema = Yup.object().shape({
    warehouse: Yup.object().shape({
        street_number: requiredStringSchema(),
        street_name: requiredStringSchema(),
        city: Yup.number().required(),
    }),
    volume: requiredStringSchema(),
    rental_price: requiredStringSchema(),
});

export const useCreateStore = () => {
    const mutation = createStoreMutation();

    const formik = useFormik<CreateStoreRequest>({
        initialValues: {
            warehouse: {
                operating_modes: [],
                street_name: "",
                street_number: "",
                is_warehouse: false,
                additional_information: "",
                city: 0,
            },
            volume: "",
            rental_price: "",
            enabled: false,
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
const createStoreSellerSchema = Yup.object().shape({
    warehouse: Yup.object().shape({
        street_number: requiredStringSchema(),
        street_name: requiredStringSchema(),
        city: Yup.number().required(),
    }),
    kaspi_warehouse_id: kaspiWarehouseIdSchema,
});
export const useCreateStoreSeller = () => {
    const mutation = createStoreSellerMutation();

    const formik = useFormik<CreateStoreSellerRequest>({
        initialValues: {
            warehouse: {
                operating_modes: [],
                street_name: "",
                street_number: "",
                is_warehouse: false,
                additional_information: "",
                city: 0,
            },
            enabled: false,
            kaspi_warehouse_id: "",
        },
        validationSchema: createStoreSellerSchema,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: handleSubmit,
    });

    async function handleSubmit() {
        await mutation.mutateAsync(formik.values);
    }

    return { formik, mutation };
};

export const useActivateStoreSeller = (wonder_id: number) => {
    const mutation = activateStoreSellerMutation(wonder_id);

    const formik = useFormik<ActivateStoreSellerRequest>({
        initialValues: {
            kaspi_warehouse_id: "",
            enabled: true,
        },
        validationSchema: Yup.object().shape({
            kaspi_warehouse_id: kaspiWarehouseIdSchema,
        }),
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
    warehouse: Yup.object().shape({
        street_number: requiredStringSchema(),
        street_name: requiredStringSchema(),
        // additional_information: Yup.string(),
        city: Yup.string().required(),
    }),
    volume: requiredStringSchema(),
    rental_price: requiredStringSchema(),
});

export const useUpdateStore = (
    storeId: number,
    initialValues: GetDetailStoreResponse | undefined
) => {
    const mutation = updateStoreMutation(storeId);

    const formik = useFormik<UpdateStoreRequest>({
        initialValues: {
            volume: "",
            rental_price: "",
            enabled: false,
            warehouse: {
                operating_modes: [],
                street_name: "",
                street_number: "",
                is_warehouse: false,
                additional_information: "",
                city: 0,
            },
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
const updateStoreSellerSchema = Yup.object().shape({
    warehouse: Yup.object().shape({
        street_number: requiredStringSchema(),
        street_name: requiredStringSchema(),
        city: Yup.string().required(),
    }),
    kaspi_warehouse_id: kaspiWarehouseIdSchema,
});
export const useUpdateStoreSeller = (
    storeId: number,
    initialValues: GetDetailSellerStoreResponse | undefined
) => {
    const mutation = updateStoreSellerMutation(storeId);

    const formik = useFormik<UpdateStoreSellerRequest>({
        initialValues: {
            kaspi_warehouse_id: "",
            enabled: false,
            warehouse: {
                operating_modes: [],
                street_name: "",
                street_number: "",
                is_warehouse: false,
                additional_information: "",
                city: 0,
            },
        },
        validationSchema: updateStoreSellerSchema,
        validateOnBlur: true,
        validateOnChange: true,
        onSubmit: handleSubmit,
    });

    useEffect(() => {
        if (initialValues) {
            formik.resetForm({
                values: mapGetSellerStoreToUpdate(initialValues),
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

export const useBindBoxToStore = (storeId: number) => {
    const mutation = bindBoxToStoreMutation();

    const formik = useFormik({
        initialValues: {
            boxId: 0,
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

export const useRemoveBoxFromStore = (storeId: number) => {
    const mutation = removeBoxFromStoreMutation();

    const formik = useFormik({
        initialValues: {
            boxId: 0,
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
