import { FormikProps } from "formik";
import { ChangeEvent } from "react";
import * as Yup from "yup";

export function getFormikHelpText(
    formik: FormikProps<any>,
    name: string
): string | undefined {
    if (formik.touched[name] && formik.errors[name]) {
        return formik.errors[name] as string;
    }
    return undefined;
}

export const requiredStringSchema = (fieldName: string = "This field") =>
    Yup.string().required(`${fieldName} is required!`);

export const requiredNumberSchema = (fieldName: string = "This field") =>
    Yup.number().required(`${fieldName} is required!`);

export const emailSchema = Yup.string().email("Invalid email address!");

const KzPhoneNumberRegex = /^\+\d \d{3} \d{3} \d{2} \d{2}$/;
export const KzPhoneNumberSchema = Yup.string().matches(
    KzPhoneNumberRegex,
    "The field must contain valid phone number"
);

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

export const passwordSchemas = {
    self: requiredStringSchema().max(20).min(6),
    repeat: requiredStringSchema().test(
        "password-match",
        "Passwords must match",
        function (value) {
            return value === this.parent.password;
        }
    ),
};
