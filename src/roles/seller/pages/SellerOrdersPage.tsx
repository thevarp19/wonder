import { SearchInput } from "@/components/ui/SearchInput";
import { SellerOrdersTable } from "@/modules/order/components/OrdersTable/SellerOrdersTable";
import { FC, useState } from "react";

interface SellerOrdersPageProps {}

export const SellerOrdersPage: FC<SellerOrdersPageProps> = ({}) => {
    const [searchValue, setSearchValue] = useState("");
    // const debouncedSearchValue = useDebounce(searchValue, 500);
    return (
        <div>
            <h1 className="pb-4 text-2xl font-semibold">Orders</h1>
            <div className="flex items-center justify-between mb-4">
                <div className="w-full max-w-sm">
                    <SearchInput
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                        onSearch={() => {}}
                    />
                </div>
                {/* <div>
                    <Button
                        type="primary"
                        size="large"
                        icon={<FilterOutlined />}
                    ></Button>
                </div> */}
            </div>
            <SellerOrdersTable />
        </div>
    );
};
