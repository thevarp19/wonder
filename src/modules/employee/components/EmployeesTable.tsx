import { DeleteButton } from "@/components/ui/DeleteButton";
import { EditOutlined, LockOutlined } from "@ant-design/icons";
import { App, Button, Form, Input, Modal, Table, TableColumnsType } from "antd";
import { FC, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { changeEmployeePassword } from "../api";
import { deleteEmployeeMutation } from "../mutations";
import { useGetEmployees } from "../queries";
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
        title: "Имя",
        render: (_, record) => (
            <span>
                {record.first_name} {record.last_name}
            </span>
        ),
    },
    {
        title: "Номер телефона",
        dataIndex: "phone_number",
    },
    {
        title: "Электронная почта",
        dataIndex: "email",
    },
    {
        title: "Редактировать",
        render: (_, record) => (
            <UpdateEmployeeModal
                storeId={record.storeId}
                id={record.id}
                initialValues={record}
            />
        ),
    },
    {
        title: "Изменить пароль",
        render: (_, record) => <ChangeEmployeePasswordModal id={record.id} />,
    },
    {
        title: "Удалить",
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
    const isSmallScreen = useMediaQuery({ query: "(max-width: 768px)" });

    return (
        <Table
            columns={columns}
            dataSource={
                employees?.map((employee) => ({ ...employee, storeId })) ?? []
            }
            rowKey={"id"}
            loading={isPending}
            pagination={{
                position: isSmallScreen ? ["bottomCenter"] : undefined,
            }}
            scroll={{ x: "max-content" }}
        />
    );
};

const UpdateEmployeeModal = ({
    storeId,
    id,
    initialValues,
}: {
    storeId: number;
    id: number;
    initialValues?: GetEmployee;
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // const { data, isPending } = useGetEmployeeById(id);

    return (
        <>
            <Modal
                title="Обновить информацию о сотруднике"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                cancelText="Назад"
                cancelButtonProps={{ style: { width: "100%" } }}
                okButtonProps={{ style: { display: "none" } }}
                destroyOnClose
            >
                {/* {isPending && <Spin size="large" />} */}
                {initialValues && (
                    <UpdateEmployeeForm
                        storeId={storeId}
                        id={id}
                        onSuccess={() => {
                            setIsModalOpen(false);
                        }}
                        initialValues={initialValues}
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
            message.success("Успешно!");
            setIsModalOpen(false);
        } catch (e: any) {
            message.error(e?.response?.data.message || "Ошибка");
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <Modal
                title="Изменить пароль сотрудника"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                cancelText="Назад"
                cancelButtonProps={{ style: { width: "100%" } }}
                okButtonProps={{ style: { display: "none" } }}
                destroyOnClose
            >
                <Form onFinish={onFinish} layout="vertical">
                    <Form.Item
                        label="Новый пароль"
                        required
                        className="!mb-4"
                        name={"password"}
                        rules={[{ min: 6, max: 20 }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            htmlType="submit"
                            type="primary"
                            className="!mb-4 !w-full"
                            loading={loading}
                        >
                            Изменить
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
            <Button
                icon={<LockOutlined />}
                onClick={() => setIsModalOpen(true)}
            >
                Изменить пароль
            </Button>
        </>
    );
};
