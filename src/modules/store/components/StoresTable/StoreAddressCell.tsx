import { FC } from "react";

interface StoreAddressCellProps {
    formattedAddress: string;
    city: { id: number; name: string };
    streetName: string;
}

export const StoreAddressCell: FC<StoreAddressCellProps> = ({
    formattedAddress,
}) => {
    return <div>{formattedAddress}</div>;
};
