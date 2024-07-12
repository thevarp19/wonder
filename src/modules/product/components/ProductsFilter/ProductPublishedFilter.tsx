import { Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { FC, useEffect, useState } from "react";

interface ProductPublishedFilterProps {
    isPublished: boolean | null;
    setIsPublished: (value: boolean | null) => void;
}

export const ProductPublishedFilter: FC<ProductPublishedFilterProps> = ({
    setIsPublished,
}) => {
    const [checked, setChecked] = useState<"published" | "unpublished" | null>(
        null
    );

    useEffect(() => {
        if (checked === "published") {
            setIsPublished(true);
        } else if (checked === "unpublished") {
            setIsPublished(false);
        } else {
            setIsPublished(null);
        }
    }, [checked, setIsPublished]);

    const handlePublishedChange = (e: CheckboxChangeEvent) => {
        if (e.target.checked) {
            setChecked("published");
        } else {
            setChecked(null);
        }
    };

    const handleUnpublishedChange = (e: CheckboxChangeEvent) => {
        if (e.target.checked) {
            setChecked("unpublished");
        } else {
            setChecked(null);
        }
    };

    return (
        <div className="flex flex-col my-4 md:flex-row">
            <Checkbox
                checked={checked === "published"}
                onChange={handlePublishedChange}
            >
                Опубликованные
            </Checkbox>
            <Checkbox
                checked={checked === "unpublished"}
                onChange={handleUnpublishedChange}
            >
                Неопубликованные
            </Checkbox>
        </div>
    );
};
