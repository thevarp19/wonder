import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { FC } from "react";

interface SearchInputProps {
    searchValue: string;
    setSearchValue: (value: string) => void;
    onSearch: () => void;
}

export const SearchInput: FC<SearchInputProps> = ({
    searchValue,
    setSearchValue,
    onSearch,
}) => {
    return (
        <div className="flex items-end w-full gap-4 my-2">
            <Input
                prefix={<SearchOutlined />}
                placeholder="Поиск"
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.target.value);
                }}
            />
            <Button type="primary" onClick={onSearch}>
                Поиск
            </Button>
        </div>
    );
};
