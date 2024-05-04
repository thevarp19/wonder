import { DeleteButton } from "@/components/ui/DeleteButton";
import { EditOutlined } from "@ant-design/icons";
import { Table, TableColumnsType } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import { deleteEmployeeMutation } from "../mutations";
import { useGetEmployees } from "../queries";
import { GetEmployee } from "../types";

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
            <Link
                to={`/admin/settings/update-store/${record.id}`}
                className="cursor-pointer"
            >
                <EditOutlined style={{ fontSize: "24px" }} />
            </Link>
        ),
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
