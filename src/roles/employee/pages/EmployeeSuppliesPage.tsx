import { scan, searchIcon } from "@/assets";
import { Image } from "@/components/ui/Image";
import { EmployeeSuppliesTable } from "@/modules/supply/components/SuppliesTable/EmployeeSuppliesTable";
import { cn } from "@/utils/shared.util";
import { Input } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";

interface EmployeeSuppliesPageProps {}

export const EmployeeSuppliesPage: FC<EmployeeSuppliesPageProps> = ({}) => {
    return (
        <div className="flex flex-col gap-5">
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
            <Link to={"/employee/scan"} className="w-full">
                <div className="flex items-center justify-center bg-[#EF7214] rounded-md cursor-pointer py-[20px] md:w-max w-full md:max-h-[32px] max-h-[47px] gap-2 px-6">
                    <Image
                        src={scan}
                        alt="scan"
                        className={cn("min-w-4 h-4")}
                    />
                    <h2 className="text-white ">Начать сканирование</h2>
                </div>
            </Link>
            <EmployeeSuppliesTable />
        </div>
    );
};
