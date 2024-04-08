import { SuppliesCalendar } from "@/modules/supply/components/SuppliesCalendar";
import { FC } from "react";

interface EmployeeSuppliesPageProps {}

export const EmployeeSuppliesPage: FC<EmployeeSuppliesPageProps> = ({}) => {
    return (
        <div>
            <SuppliesCalendar />
        </div>
    );
};
