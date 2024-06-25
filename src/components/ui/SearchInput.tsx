import { searchIcon } from "@/assets";
import { cn } from "@/utils/shared.util";
import { Button, Input } from "antd";
import { FC } from "react";
import { Image } from "./Image";

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
                prefix={
                    <Image
                        src={searchIcon}
                        alt="collapse"
                        className={cn("w-5 h-5")}
                    />
                }
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
