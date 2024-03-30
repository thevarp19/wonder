import * as Yup from "yup";

export const requiredStringSchema = (fieldName: string = "This field") =>
    Yup.string().required(`${fieldName} is required!`);

export const requiredNumberSchema = (fieldName: string = "This field") =>
    Yup.number().required(`${fieldName} is required!`);

export const requiredBooleanSchema = (fieldName: string = "This field") =>
    Yup.boolean().required(`${fieldName} is required!`);

export const emailSchema = () => Yup.string().email("Invalid email address!");

const KzPhoneNumberRegex = /^\+\d \d{3} \d{3} \d{2} \d{2}$/;

export const KzPhoneNumberSchema = () =>
    Yup.string().matches(
        KzPhoneNumberRegex,
        "The field must contain valid phone number"
    );

export const passwordSchemas = (passwordFieldName: string = "password") => ({
    self: Yup.string().max(20).min(6),
    repeat: Yup.string().test(
        "password-match",
        "Passwords must match",
        function (value) {
            return value === this.parent[passwordFieldName];
        }
    ),
});
