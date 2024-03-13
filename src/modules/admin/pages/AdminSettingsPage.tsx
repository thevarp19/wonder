import { Button } from "antd";
import { FC } from "react";
import { AdminStoresTable } from "../components/store/AdminStoresTable";

interface AdminSettingsPageProps {}

export const AdminSettingsPage: FC<AdminSettingsPageProps> = ({}) => {
    return (
        <div>
            <h1 className="py-4 text-2xl font-semibold">Stores</h1>
            <Button
                size="large"
                type="primary"
                className="mb-4"
                href="/admin/settings/create-store"
            >
                Create a new store
            </Button>
            <AdminStoresTable />
        </div>
    );
};
