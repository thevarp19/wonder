import { bellIcon, houseIcon, searchToolbar } from "@/assets";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Image } from "../ui/Image";

export const BottomNav: FC = () => {
    return (
        <div className="fixed bottom-0 z-50 flex justify-around w-full py-5 bg-white sm:hidden ">
            <Link to={""}>
                <Image
                    src={houseIcon}
                    alt="house"
                    className="w-[28px] h-[28px]"
                />
            </Link>
            <Link to={""}>
                <Image
                    src={bellIcon}
                    alt="bell"
                    className="w-[28px] h-[28px]"
                />
            </Link>
            <Link to={"#"}>
                <Image
                    src={searchToolbar}
                    alt="logo"
                    className="w-[28px] h-[28px] rounded-full"
                />
            </Link>
        </div>
    );
};
