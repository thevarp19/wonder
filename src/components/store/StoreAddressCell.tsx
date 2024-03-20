import { FC } from "react";

interface StoreAddressCellProps {
    address: string;
    city: string;
    street: string;
}

export const StoreAddressCell: FC<StoreAddressCellProps> = ({
    address,
    street,
    city,
}) => {
    return (
        <div>
            г. {city}, {street}, {address}
        </div>
    );
};
