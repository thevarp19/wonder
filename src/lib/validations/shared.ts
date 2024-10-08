import * as Yup from "yup";

export const requiredStringSchema = (fieldName: string = "Это поле") =>
    Yup.string().required(`${fieldName} обязательно для заполнения!`);

export const requiredNumberSchema = (fieldName: string = "Это поле") =>
    Yup.number().required(`${fieldName} обязательно для заполнения!`);

export const requiredBooleanSchema = (fieldName: string = "Это поле") =>
    Yup.boolean().required(`${fieldName} обязательно для заполнения!`);

export const emailSchema = () =>
    Yup.string().email("Некорректный адрес электронной почты!");

export const kaspiWarehouseIdSchema = Yup.string()
    .matches(
        /^PP\d+$/,
        "Kaspi ID должен начинаться с 'PP' и за ним должны следовать цифры."
    )
    .required("Kaspi ID обязателен для заполнения.");

const KzPhoneNumberRegex = /^\+\d \d{3} \d{3} \d{2} \d{2}$/;

export const KzPhoneNumberSchema = () =>
    Yup.string().matches(
        KzPhoneNumberRegex,
        "Поле должно содержать корректный номер телефона"
    );

export const passwordSchemas = (passwordFieldName: string = "password") => ({
    self: Yup.string()
        .max(20, "Пароль должен содержать не более 20 символов")
        .min(6, "Пароль должен содержать не менее 6 символов"),
    repeat: Yup.string().test(
        "password-match",
        "Пароли должны совпадать",
        function (value) {
            return value === this.parent[passwordFieldName];
        }
    ),
});
