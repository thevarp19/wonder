import { FC, ImgHTMLAttributes, useState } from "react";

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    wrapperClassName?: string;
}

export const Image: FC<ImageProps> = ({
    className,
    wrapperClassName,
    ...props
}) => {
    const [loading, setLoading] = useState(false);

    return (
        <div
            className={`relative max-w-max ${
                wrapperClassName ? wrapperClassName : ""
            }`}
        >
            <img
                loading="lazy"
                onLoadStart={() => setLoading(true)}
                onLoad={() => setLoading(false)}
                className={`object-contain object-center ${
                    className ? className : ""
                }`}
                {...props}
            />
            {loading && (
                <div className="absolute top-0 left-0 z-10 w-full h-full bg-gray-500 animate-pulse" />
            )}
        </div>
    );
};
