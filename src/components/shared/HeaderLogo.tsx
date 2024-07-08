import { logo } from "@/assets";
import { cn } from "@/utils/shared.util";
import { LeftOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Avatar } from "antd/lib";
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
        <div className="md:fixed static top-0 z-10 flex bg-white justify-between items-center md:flex-row flex-row-reverse w-full py-[15px] md:px-6 px-1 md:rounded-b-[32px] rounded-b-0">
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
            <Link to={"https://wonderff.tilda.ws/"}>
                {isSmallScreen ? (
                    <Avatar
                        size={40}
                        icon={<LeftOutlined />}
                        style={{
                            backgroundColor: "inherit",
                            color: "#000",
                        }}
                    />
                ) : (
                    <Button type="primary" size="large">
                        На главную страницу
                    </Button>
                )}
            </Link>
        </div>
    );
};
