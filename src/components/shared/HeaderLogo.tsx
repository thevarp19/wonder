import { arrowLeftIcon, logo } from "@/assets";
import { cn } from "@/utils/shared.util";
import { FC } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { Image } from "../ui/Image";

interface LogoProps {
    link?: string;
}

export const HeaderLogo: FC<LogoProps> = ({ link }) => {
    const isSmallScreen = useMediaQuery({ query: "(max-width: 768px" });

    return (
        <div className="md:fixed static top-0 z-10 flex bg-white justify-between items-center md:flex-row flex-row-reverse w-full py-[10px] md:px-6 px-4 md:rounded-b-[32px] rounded-b-0">
            <div className="flex items-center gap-10">
                {" "}
                <Link
                    to={link || "/"}
                    className="flex justify-center flex-1 md:justify-start"
                >
                    <Image
                        src={logo}
                        alt="logo"
                        className={cn(
                            "sm:w-[150px] sm:h-[40px] w-[108px] h-[24px]"
                        )}
                    />
                </Link>
                <Link
                    to={"/calculator"}
                    style={{ color: "inherit", textDecoration: "inherit" }}
                >
                    <div className="text-lg">Калькулятор</div>
                </Link>
            </div>
            <Link
                to={"/"}
                className="relative flex items-center justify-center"
            >
                {isSmallScreen ? (
                    <div className="absolute left-0 w-[32px]">
                        <Image
                            src={arrowLeftIcon}
                            alt="arrowLeftIcon"
                            className={cn("w-[32px] h-[32px]")}
                        />
                    </div>
                ) : (
                    <></>
                    // <Button type="primary" size="large">
                    //     На главную страницу
                    // </Button>
                )}
            </Link>
        </div>
    );
};
