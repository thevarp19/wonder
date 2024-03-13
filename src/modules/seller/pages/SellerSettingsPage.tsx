import { FC } from "react";
import { SellerStoresTable } from "../components/store/SellerStoresTable";

interface SellerSettingsPageProps {}

export const SellerSettingsPage: FC<SellerSettingsPageProps> = ({}) => {
    return (
        <div>
            <h1 className="py-4 text-2xl font-semibold">Stores</h1>
            <SellerStoresTable />
        </div>
    );
};
