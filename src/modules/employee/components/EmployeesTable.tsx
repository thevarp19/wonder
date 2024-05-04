import { DeleteButton } from "@/components/ui/DeleteButton";
import { EditOutlined, LockOutlined } from "@ant-design/icons";
import {
    App,
    Button,
    Form,
    Input,
    Modal,
    Spin,
    Table,
    TableColumnsType,
} from "antd";
import { FC, useState } from "react";
import { changeEmployeePassword } from "../api";
import { deleteEmployeeMutation } from "../mutations";
import { useGetEmployeeById, useGetEmployees } from "../queries";
import { GetEmployee } from "../types";
import { UpdateEmployeeForm } from "./UpdateEmployeeForm";

interface EmployeesTableProps {
    storeId: number;
}

interface EmployeesTableColumns extends GetEmployee {
    storeId: number;
}

const columns: TableColumnsType<EmployeesTableColumns> = [
    {
        title: "ID",
        dataIndex: "id",
    },
    {
        title: "Name",
        render: (_, record) => (
            <span>
                {record.firstName} {record.lastName}
            </span>
        ),
    },
    {
        title: "Phone number",
        dataIndex: "phoneNumber",
    },
    {
        title: "Email",
        dataIndex: "email",
    },
    {
        title: "Edit",
        render: (_, record) => (
            <UpdateEmployeeModal storeId={record.storeId} id={record.id} />
        ),
    },
    {
        title: "Change Password",
        render: (_, record) => <ChangeEmployeePasswordModal id={record.id} />,
    },
    {
        title: "Delete",
        render: (_, record) => (
            <DeleteEmployeeCell id={record.id} storeId={record.storeId} />
        ),
    },
];

function DeleteEmployeeCell({ id, storeId }: { id: number; storeId: number }) {
    const { mutateAsync } = deleteEmployeeMutation(id, storeId);
    return <DeleteButton onConfirm={async () => await mutateAsync()} />;
}

export const EmployeesTable: FC<EmployeesTableProps> = ({ storeId }) => {
    const { data: employees, isPending } = useGetEmployees(storeId);
    return (
        <Table
            columns={columns}
            dataSource={
                employees?.map((employee) => ({ ...employee, storeId })) ?? []
            }
            rowKey={"id"}
            loading={isPending}
        />
    );
};

const UpdateEmployeeModal = ({
    storeId,
    id,
}: {
    storeId: number;
    id: number;
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data, isPending } = useGetEmployeeById(id);

    return (
        <>
            <Modal
                title="Update Employee"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                okButtonProps={{ style: { display: "none" } }}
                destroyOnClose
            >
                {isPending && <Spin size="large" />}
                {data && (
                    <UpdateEmployeeForm
                        storeId={storeId}
                        id={id}
                        onSuccess={() => {
                            setIsModalOpen(false);
                        }}
                        initialValues={data}
                    />
                )}
            </Modal>
            <EditOutlined
                onClick={() => setIsModalOpen(true)}
                style={{ fontSize: "24px" }}
            />
        </>
    );
};
const ChangeEmployeePasswordModal = ({ id }: { id: number }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { message } = App.useApp();
    const [loading, setLoading] = useState(false);
    async function onFinish(values: any) {
        setLoading(true);
        try {
            await changeEmployeePassword(id, values);
            message.success("Success!");
            setIsModalOpen(false);
        } catch (e: any) {
            message.error(e?.response?.data.message || "Error");
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <Modal
                title="Change Employee password"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                okButtonProps={{ style: { display: "none" } }}
                destroyOnClose
            >
                <Form onFinish={onFinish} layout="vertical">
                    <Form.Item
                        label="Old password"
                        required
                        name={"oldPassword"}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="New password"
                        required
                        name={"newPassword"}
                        rules={[{ min: 6, max: 20 }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            htmlType="submit"
                            type="primary"
                            loading={loading}
                        >
                            Change
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Button
                icon={<LockOutlined />}
                onClick={() => setIsModalOpen(true)}
            >
                Change password
            </Button>
        </>
    );
};
