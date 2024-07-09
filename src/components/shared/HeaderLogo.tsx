import { logo } from "@/assets";
import { cn } from "@/utils/shared.util";
import { Button } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Image } from "../ui/Image";
import { LeftOutlined } from "@ant-design/icons";
import { Avatar } from "antd/lib";
import { useMediaQuery } from 'react-responsive';

interface LogoProps {
    link?: string;
}

export const HeaderLogo: FC<LogoProps> = ({ link }) => {

    const isSmallScreen = useMediaQuery({ query: '(max-width: 768px' })

    return (
        <div className="md:fixed static top-0 z-10 flex bg-white justify-between items-center md:flex-row flex-row-reverse w-full py-[15px] md:px-6 px-1 md:rounded-b-[32px] rounded-b-0">
            <Link to={link || "/"} className="flex flex-1 md:justify-start justify-center">
                <Image
                    src={logo}
                    alt="logo"
                    className={cn("w-[150px] h-[40px]")}
                />
            </Link>
            <Link to={"https://wonderff.tilda.ws/"}>
                { isSmallScreen ? (
                    <Avatar 
                        size={40} 
                        icon={<LeftOutlined/>} 
                        style={{
                            backgroundColor: 'inherit', 
                            color: '#000',
                            position: 'absolute',
                            top: 15,
                            left: 16
                        }}
                    />
                ) : (
                    <Button type="primary" size="large">
                        На главную страницу
                    </Button>
                ) }
            </Link>
        </div>
    );
};
