import { cn } from "@/utils/shared.util";
import { Spin } from "antd";
import { FC } from "react";

interface LoadingProps {
    className?: string;
}

export const Loading: FC<LoadingProps> = ({ className }) => {
    return (
        <div
            className={cn(
                "flex items-center justify-center w-full h-full",
                className
            )}
        >
            <Spin size="large" />
        </div>
    );
};
