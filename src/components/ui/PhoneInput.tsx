import { formatPhoneNumber, getFormikHelpText } from "@/utils/form.util";
import { cn } from "@/utils/shared.util";
import { Form, Input } from "antd";
import { ChangeEventHandler, FC } from "react";

export const PhoneNumberInput: FC<{
    formik: any;
    name: string;
    disabled: boolean;
}> = ({ formik, name, disabled }) => {
    const handlePhoneNumberChange: ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        const { value } = e.target;
        const formattedValue = formatPhoneNumber(value);
        formik.setFieldValue(name, formattedValue);
    };

    return (
        <Form.Item
            validateStatus={getFormikHelpText(formik, name) ? "error" : ""}
            help={getFormikHelpText(formik, name)}
            label="Номер телефон"
            required
            className={cn("w-full !mb-4")}
        >
            <Input
                onChange={handlePhoneNumberChange}
                onBlur={formik.handleBlur}
                name={name}
                required={false}
                value={formik.values[name]}
                disabled={disabled}
            />
        </Form.Item>
    );
};
