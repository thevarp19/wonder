import { searchIcon } from "@/assets";
import { Image } from "@/components/ui/Image";
import { SellerServiceParamsTable } from "@/modules/services/components/SellerServiceParamsTable";
import { Input } from "antd";
import { FC } from "react";

export const SellerServiceParamsPage: FC = () => {
    return (
        <div className="h-full">
            <div className="flex flex-col gap-5">
                <div className="overflow-x-auto bg-[#F7F9FB] md:pt-0 pt-2 rounded-lg">
                    <div className="min-w-[600px] flex  py-2 justify-end">
                        <div className="flex items-center gap-4 px-2 rounded-lg">
                            <Input
                                prefix={
                                    <Image
                                        src={searchIcon}
                                        alt="searchIcon"
                                        className={"w-5 h-5"}
                                    />
                                }
                                placeholder="Поиск"
                                value={""}
                                className="!min-w-[217px]"
                                onChange={() => {}}
                            />
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto w-full md:mb-0 mb-[70px]">
                    <SellerServiceParamsTable />
                </div>
            </div>
        </div>
    );
};
