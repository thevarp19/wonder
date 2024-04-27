import { Button } from "antd";
import { FC } from "react";
import { toScanBox } from "../../utils";

interface ScanBoxStepProps {}

export const ScanBoxStep: FC<ScanBoxStepProps> = ({}) => {
    return (
        <div>
            <Button
                size="large"
                type="primary"
                className="my-4"
                onClick={toScanBox}
            >
                Scan box
            </Button>
        </div>
    );
};
