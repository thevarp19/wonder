import { FC } from "react";

interface StoreAddressCellProps {
    address: string;
    city: { id: number; name: string };
    streetName: string;
}

export const StoreAddressCell: FC<StoreAddressCellProps> = ({ address }) => {
    return <div>{address}</div>;
};
