import { logo } from "@/assets";
import { cn } from "@/utils/shared.util";
import { FC } from "react";
import { Link } from "react-router-dom";

interface LogoProps {}

export const Logo: FC<LogoProps> = ({}) => {
    return (
        <Link to={"/"}>
            <img src={logo} alt="logo" className={cn("w-40")} />
        </Link>
    );
};
