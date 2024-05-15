import { Checkbox } from "antd";
import { FC, useEffect, useState } from "react";

interface ProductPublishedFilterProps {
    isPublished: boolean | null;
    setIsPublished: (value: boolean | null) => void;
}

export const ProductPublishedFilter: FC<ProductPublishedFilterProps> = ({
    setIsPublished,
}) => {
    const [checked, setChecked] = useState<("published" | "unpublished")[]>([]);
    useEffect(() => {
        if (checked.includes("published") && checked.includes("unpublished")) {
            setIsPublished(null);
        } else if (checked.includes("published")) {
            setIsPublished(true);
        } else if (checked.includes("unpublished")) {
            setIsPublished(false);
        } else {
            setIsPublished(null);
        }
    }, [checked]);
    return (
        <div className="flex my-4">
            <Checkbox
                onChange={(e) => {
                    if (e.target.checked) {
                        setChecked((prev) => [...prev, "published"]);
                    } else {
                        setChecked((prev) =>
                            prev.filter((item) => item !== "published")
                        );
                    }
                }}
            >
                Published
            </Checkbox>
            <Checkbox
                onChange={(e) => {
                    if (e.target.checked) {
                        setChecked((prev) => [...prev, "unpublished"]);
                    } else {
                        setChecked((prev) =>
                            prev.filter((item) => item !== "unpublished")
                        );
                    }
                }}
            >
                Unpublished
            </Checkbox>
        </div>
    );
};
