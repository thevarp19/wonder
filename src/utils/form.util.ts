import { FormikProps } from "formik";
import { ChangeEvent } from "react";

// export function getFormikHelpText(
//     formik: FormikProps<any>,
//     name: string
// ): string | undefined {
//     if (formik.touched[name] && formik.errors[name]) {
//         return formik.errors[name] as string;
//     }
//     return undefined;
// }
export const getFormikHelpText = (formik: FormikProps<any>, name: string) => {
    const error = formik.errors;
    const touched = formik.touched;
    const keys = name.split(".");

    const errorMsg = keys.reduce(
        (acc: any, key) => (acc && acc[key] ? acc[key] : undefined),
        error
    );
    const isTouched = keys.reduce(
        (acc: any, key) => (acc && acc[key] ? acc[key] : undefined),
        touched
    );

    return isTouched && errorMsg ? errorMsg : null;
};

export const phoneNumberChangeHandler = (
    e: ChangeEvent<HTMLInputElement>,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
): void => {
    if (/^\+?[0-9 ]*$/.test(e.target.value)) {
        let value: string = e.target.value.replace(/\s+/g, "");

        if (value.length > 1) {
            value = "+" + value.substring(1);
        }
        if (value.length > 2) {
            value = value.substring(0, 2) + " " + value.substring(2);
        }
        if (value.length > 6) {
            value = value.substring(0, 6) + " " + value.substring(6);
        }
        if (value.length > 10) {
            value = value.substring(0, 10) + " " + value.substring(10);
        }
        if (value.length > 13) {
            value = value.substring(0, 13) + " " + value.substring(13);
        }
        if (value.length > 16) {
            value = value.substring(0, 16);
        }

        e.target.value = value;
        onChange(e);
    }
};

export const phoneNumberChange = (phone: string) => {
    if (/^\+?[0-9 ]*$/.test(phone)) {
        let value: string = phone.replace(/\s+/g, "");

        if (value.length > 1) {
            value = "+" + value.substring(1);
        }
        if (value.length > 2) {
            value = value.substring(0, 2) + " " + value.substring(2);
        }
        if (value.length > 6) {
            value = value.substring(0, 6) + " " + value.substring(6);
        }
        if (value.length > 10) {
            value = value.substring(0, 10) + " " + value.substring(10);
        }
        if (value.length > 13) {
            value = value.substring(0, 13) + " " + value.substring(13);
        }
        if (value.length > 16) {
            value = value.substring(0, 16);
        }
        return value;
    }
};

export const formatPhoneNumber = (value: string) => {
    let formattedValue = value.replace(/\D/g, ""); // Удаляем все нецифровые символы

    if (formattedValue.startsWith("7")) {
        formattedValue = "+" + formattedValue; // Убедимся, что номер начинается с '+7'
    } else if (!formattedValue.startsWith("+7")) {
        formattedValue = "+7" + formattedValue; // Добавляем '+7', если он не присутствует
    }

    if (formattedValue.length > 2) {
        formattedValue =
            formattedValue.slice(0, 2) + " " + formattedValue.slice(2);
    }
    if (formattedValue.length > 6) {
        formattedValue =
            formattedValue.slice(0, 6) + " " + formattedValue.slice(6);
    }
    if (formattedValue.length > 10) {
        formattedValue =
            formattedValue.slice(0, 10) + " " + formattedValue.slice(10);
    }
    if (formattedValue.length > 13) {
        formattedValue =
            formattedValue.slice(0, 13) + " " + formattedValue.slice(13);
    }
    if (formattedValue.length > 16) {
        formattedValue = formattedValue.slice(0, 16);
    }

    return formattedValue;
};
