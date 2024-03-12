import { logo } from "@/assets";
import { cn } from "@/utils/shared.util";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Image } from "../ui/Image";

interface LogoProps {}

export const Logo: FC<LogoProps> = ({}) => {
    return (
        <Link to={"/"}>
            <Image src={logo} alt="logo" className={cn("w-40")} />
        </Link>
    );
};
