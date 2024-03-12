import { Spin } from "antd";
import { FC } from "react";

interface LoadingProps {}

export const Loading: FC<LoadingProps> = ({}) => {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <Spin size="large" />
        </div>
    );
};
