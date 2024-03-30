import { FC } from "react";

interface StoreAddressCellProps {
    address: string;
    city: { id: number; name: string };
    street: string;
}

export const StoreAddressCell: FC<StoreAddressCellProps> = ({
    address,
    street,
    city,
}) => {
    return (
        <div>
            г. {city.name}, {street}, {address}
        </div>
    );
};
