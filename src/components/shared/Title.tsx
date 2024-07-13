import { FC } from "react";

export const Title: FC<{ text: string }> = ({ text }) => {
    return <h2 className="text-[18px] font-semibold pb-5 px-2">{text}</h2>;
};
