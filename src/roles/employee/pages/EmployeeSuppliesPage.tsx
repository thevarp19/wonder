import { searchIcon } from "@/assets";
import { Image } from "@/components/ui/Image";
import { EmployeeSuppliesTable } from "@/modules/supply/components/SuppliesTable/EmployeeSuppliesTable";
import { cn } from "@/utils/shared.util";
import { Input } from "antd";
import { FC } from "react";

interface EmployeeSuppliesPageProps {}

export const EmployeeSuppliesPage: FC<EmployeeSuppliesPageProps> = ({}) => {
    return (
        <div>
            <div className="overflow-x-auto bg-[#F7F9FB]  rounded-lg py-3">
                <div className="min-w-[600px] flex justify-between">
                    <div className="flex items-center gap-4 px-2 rounded-lg">
                        <Input
                            prefix={
                                <Image
                                    src={searchIcon}
                                    alt="searchIcon"
                                    className={cn("w-5 h-5")}
                                />
                            }
                            placeholder="Поиск"
                            // value={""}
                            className="!min-w-[317px]"
                            onChange={() => {}}
                        />
                    </div>
                </div>
            </div>
            <EmployeeSuppliesTable />
        </div>
    );
};
