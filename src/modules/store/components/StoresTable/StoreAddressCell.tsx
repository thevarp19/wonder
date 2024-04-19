import { FC } from "react";

interface StoreAddressCellProps {
    address: string;
    city: { id: number; name: string };
    street: string;
}

export const StoreAddressCell: FC<StoreAddressCellProps> = ({ address }) => {
    return <div>{address}</div>;
};
