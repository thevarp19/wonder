import { FC } from "react";

export const Title: FC<{ text: string }> = ({ text }) => {
    return <h1 className="text-[18px] font-semibold">{text}</h1>;
};
