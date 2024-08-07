import { searchIcon } from "@/assets";
import { Title } from "@/components/shared/Title";
import { Image } from "@/components/ui/Image";
import { SellerArchiveOrdersTable } from "@/modules/order/components/SellerOrders/SellerArchiveOrdersTable";
import { useDebounce } from "@/utils/shared.util";
import { Input } from "antd";
import { FC, useState } from "react";
interface SellerOrdersPageProps {}

export const SellerArchiveOrdersPage: FC<SellerOrdersPageProps> = ({}) => {
    const [searchValue, setSearchValue] = useState("");
    const debouncedSearchValue = useDebounce(searchValue, 500);
    // const [current, setCurrent] = useState("all");
    // const [deliveryMode, setDeliveryMode] = useState<DeliveryMode>("ALL");

    // const onClick: MenuProps["onClick"] = (e) => {
    //     setCurrent(e.key);
    //     setDeliveryMode(deliveryModes[e.key]);
    // };
    return (
        <div className="h-full">
            <Title text="Архив" />
            <div className="flex flex-col gap-5">
                <div className="overflow-x-auto bg-[#F7F9FB] md:pt-0 pt-2 rounded-lg">
                    <div className="min-w-[600px] flex justify-between">
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
                                value={searchValue}
                                className="!min-w-[217px]"
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto w-full md:mb-0 mb-[70px]">
                    <SellerArchiveOrdersTable
                        searchValue={debouncedSearchValue}
                        // deliveryMode={deliveryMode}
                    />
                </div>
            </div>
        </div>
    );
};
