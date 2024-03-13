import { logo } from "@/assets";
import { cn } from "@/utils/shared.util";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Image } from "../ui/Image";

interface LogoProps {
    link?: string;
}

export const Logo: FC<LogoProps> = ({ link }) => {
    return (
        <Link to={link || "/"}>
            <Image src={logo} alt="logo" className={cn("w-40")} />
        </Link>
    );
};
