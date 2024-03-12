import { getFormikHelpText } from "@/utils/form.util";
import { cn } from "@/utils/shared.util";
import { Form, FormItemProps, Input } from "antd";
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
            className={cn(formItemProps?.className, "w-full")}
        >
            {children}
        </Form.Item>
    );
};

// const withFormik =
//     (InputComponent: any, formik: FormikProps<any>, name: string) =>
//     (props: any) => {
//         return (
//             <InputComponent
//                 onChange={formik.handleChange}
//                 onBlur={formik.handleBlur}
//                 name={name}
//                 value={formik.values[name]}
//                 {...props}
//             />
//         );
//     };

interface FormikInputProps {
    formik: FormikProps<any>;
    name: string;
    inputProps?: InputProps;
    formItemProps?: FormItemProps;
}

export const FormikInput: FC<FormikInputProps> = ({
    formik,
    name,
    formItemProps,
    inputProps,
}) => {
    return (
        <FormikItem formik={formik} name={name} formItemProps={formItemProps}>
            <Input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name={name}
                value={formik.values[name]}
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
}

export const FormikPasswordInput: FC<FormikPasswordInputProps> = ({
    formik,
    name,
    formItemProps,
    inputProps,
}) => {
    return (
        <FormikItem formik={formik} name={name} formItemProps={formItemProps}>
            <Input.Password
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name={name}
                value={formik.values[name]}
                {...inputProps}
            />
        </FormikItem>
    );
};
