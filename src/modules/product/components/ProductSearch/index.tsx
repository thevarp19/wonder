import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

export function ProductsSearch({
    searchValue,
    setSearchValue,
}: {
    searchValue: string;
    setSearchValue: (value: string) => void;
}) {
    return (
        <div className="my-2">
            <Input
                prefix={<SearchOutlined />}
                placeholder="Search"
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.target.value);
                }}
            />
        </div>
    );
}
