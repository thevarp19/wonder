import { Table, TableColumnsType } from "antd";
import { FC } from "react";
import { useGetSupply } from "../../queries";
import { GetSupplyById } from "../../types";

const columns: TableColumnsType<GetSupplyById> = [
    {
        title: "Article",
        dataIndex: "article",
    },
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Vendor code",
        dataIndex: "vendorCode",
    },
    {
        title: "Box barcode",
        dataIndex: "boxBarCode",
    },
    {
        title: "Box type name",
        dataIndex: "boxTypeName",
    },
    {
        title: "Shop name",
        dataIndex: "shopName",
    },
];

// function generateMockData(numberOfEntries: number) {
//     const mockDataArray = [];

//     for (let i = 0; i < numberOfEntries; i++) {
//         const data = {
//             article: `Article${i}`,
//             name: `Name${i}`,
//             vendorCode: `Vendor${i}`,
//             boxBarCode: `Barcode${i}`,
//             boxTypeName: `Type${i}`,
//             storeAddress: `Address${i}`,
//         };

//         mockDataArray.push(data);
//     }

//     return mockDataArray;
// }

interface SupplyDetailsTableProps {
    supplyId: number;
}

export const SupplyDetailsTable: FC<SupplyDetailsTableProps> = ({
    supplyId,
}) => {
    const { isPending } = useGetSupply(supplyId);
    return (
        <Table
            columns={columns}
            dataSource={[]}
            rowKey={"id"}
            loading={!isPending}
        />
    );
};
