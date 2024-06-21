import { logo } from "@/assets";
import { cn } from "@/utils/shared.util";
import { Button } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Image } from "../ui/Image";

interface LogoProps {
    link?: string;
}

export const HeaderLogo: FC<LogoProps> = ({ link }) => {
    return (
        <div className="flex bg-white justify-between w-full py-[15px] px-6 rounded-b-[32px]">
            <Link to={link || "/"}>
                <Image
                    src={logo}
                    alt="logo"
                    className={cn("w-[150px] h-[40px]")}
                />
            </Link>
            <Button type="primary" size="large">
                На главную страницу
            </Button>
        </div>
    );
};
