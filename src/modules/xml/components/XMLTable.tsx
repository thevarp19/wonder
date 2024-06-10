import { Table, TableColumnsType } from "antd";
import { FC } from "react";
import { XMLTableType } from "../types";
interface XMLTableProps {}
const columns: TableColumnsType<XMLTableType> = [
    {
        title: "ID магазина",
        dataIndex: "storeId",
    },
    {
        title: "Название магазина",
        dataIndex: "storeName",
    },
    {
        title: "Фамилия",
        dataIndex: "lastName",
    },
    {
        title: "Имя",
        dataIndex: "firstName",
    },
    {
        title: "Номер телефона",
        dataIndex: "phoneNumber",
    },
    {
        title: "Почта",
        dataIndex: "email",
    },
    {
        title: "XML",
        dataIndex: "xml",
    },
];
const mockData: XMLTableType[] = [
    {
        storeId: "1",
        storeName: "Магазин 1",
        lastName: "Иванов",
        firstName: "Иван",
        phoneNumber: "+77001112233",
        email: "ivanov@example.com",
        xml: "https://192.168.1.1/resource",
    },
    {
        storeId: "2",
        storeName: "Магазин 2",
        lastName: "Петров",
        firstName: "Петр",
        phoneNumber: "+77001112234",
        email: "petrov@example.com",
        xml: "https://192.168.1.1/resource",
    },
    {
        storeId: "3",
        storeName: "Магазин 3",
        lastName: "Сидоров",
        firstName: "Сидор",
        phoneNumber: "+77001112235",
        email: "sidorov@example.com",
        xml: "https://192.168.1.1/resource",
    },
];
export const XMLTable: FC<XMLTableProps> = ({}) => {
    // const { data: stores, isPending } = useGetStores();
    return (
        <Table
            columns={columns}
            dataSource={mockData}
            rowKey={"storeId"}
            // loading={isPending}
        />
    );
};
