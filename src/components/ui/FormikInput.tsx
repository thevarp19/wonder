import { getFormikHelpText } from "@/utils/form.util";
import { cn } from "@/utils/shared.util";
import {
    Form,
    FormItemProps,
    Input,
    InputNumber,
    InputNumberProps,
} from "antd";
import { InputProps, PasswordProps } from "antd/es/input";
import { FormikProps } from "formik";
import { FC } from "react";

interface FormikItemProps {
    formik: FormikProps<any>;
    name: string;
    children: React.ReactNode;
    formItemProps?: FormItemProps;
}

export const FormikItem: FC<FormikItemProps> = ({
    formik,
    name,
    children,
    formItemProps,
}) => {
    return (
        <Form.Item
            validateStatus={getFormikHelpText(formik, name) ? "error" : ""}
            help={getFormikHelpText(formik, name)}
            {...formItemProps}
            className={cn("w-full !mb-4", formItemProps?.className)}
        >
            {children}
        </Form.Item>
    );
};

interface FormikInputProps {
    formik: FormikProps<any>;
    name: string;
    value?: any;
    inputProps?: InputProps;
    formItemProps?: FormItemProps;
    inputRef?: React.RefObject<any>;
}

export const FormikInput: FC<FormikInputProps> = ({
    formik,
    name,
    formItemProps,
    value,
    inputProps,
    inputRef,
}) => {
    return (
        <FormikItem formik={formik} name={name} formItemProps={formItemProps}>
            <Input
                ref={inputRef}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name={name}
                required={false}
                value={formik.values[name] || value}
                {...inputProps}
            />
        </FormikItem>
    );
};

interface FormikNumberInputProps {
    formik: FormikProps<any>;
    name: string;
    inputProps?: InputNumberProps;
    formItemProps?: FormItemProps;
    inputRef?: React.RefObject<any>;
}

export const FormikNumberInput: FC<FormikNumberInputProps> = ({
    formik,
    name,
    formItemProps,
    inputProps,
    inputRef,
}) => {
    return (
        <FormikItem formik={formik} name={name} formItemProps={formItemProps}>
            <InputNumber
                ref={inputRef}
                onChange={(value) => {
                    formik.setFieldValue(name, value);
                }}
                onBlur={formik.handleBlur}
                name={name}
                value={formik.values[name]}
                type="number"
                {...inputProps}
            />
        </FormikItem>
    );
};

interface FormikPasswordInputProps {
    formik: FormikProps<any>;
    name: string;
    inputProps?: PasswordProps;
    formItemProps?: FormItemProps;
    inputRef?: React.RefObject<any>;
}

export const FormikPasswordInput: FC<FormikPasswordInputProps> = ({
    formik,
    name,
    formItemProps,
    inputProps,
    inputRef,
}) => {
    return (
        <FormikItem formik={formik} name={name} formItemProps={formItemProps}>
            <Input.Password
                ref={inputRef}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name={name}
                value={formik.values[name]}
                {...inputProps}
            />
        </FormikItem>
    );
};
