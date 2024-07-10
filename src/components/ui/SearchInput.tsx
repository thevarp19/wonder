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
        <div className="flex md:flex-row flex-col items-end w-full md:gap-4 gap-2 md:my-2 my-0">
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
                className="w-full md:!h-[32px] !h-[47px] md:!text-[14px] !text-[16px]"
                style={{}}
            />
            <Button
                type="primary"
                className="md:w-[130px] w-full md:!h-[32px] !h-[47px] md:!text-[13px] !text-[16px]"
                onClick={onSearch}
            >
                Найти
            </Button>
        </div>
    );
};
