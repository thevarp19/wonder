import { Button, Form, Input } from "antd";
import { FC } from "react";

interface SellerProfileEditProps {}

export const SellerProfileEdit: FC<SellerProfileEditProps> = ({}) => {
    return (
        <div>
            <Form layout="vertical" className="w-full max-w-sm">
                <Form.Item label="Name" required>
                    <Input />
                </Form.Item>
                <Form.Item label="Surname" required>
                    <Input />
                </Form.Item>
                <Form.Item label="Phone" required>
                    <Input />
                </Form.Item>
                <Form.Item label="Shop name" required>
                    <Input />
                </Form.Item>
                <Form.Item label="Shop ID" required>
                    <Input />
                </Form.Item>
                <Form.Item label="API Token" required>
                    <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                    Update
                </Button>
            </Form>
        </div>
    );
};
