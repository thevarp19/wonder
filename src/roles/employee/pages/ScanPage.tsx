import { ScanBoxStep } from "@/modules/scan/components/steps/ScanBoxStep";
import { ScanCellStep } from "@/modules/scan/components/steps/ScanCellStep";
import { ScanProductsStep } from "@/modules/scan/components/steps/ScanProductsStep";
import { SubmitStep } from "@/modules/scan/components/steps/SubmitStep";
import { acceptSupplyMutation } from "@/modules/supply/mutations";
import { AcceptSupplyProductRequest } from "@/modules/supply/types";
import { useAppSelector } from "@/redux/utils";
import { cn } from "@/utils/shared.util";
import { App, Button, Steps } from "antd";
import { FC, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface ScanPageProps {}

const steps = [
    <ScanBoxStep />,
    <ScanCellStep />,
    <ScanProductsStep />,
    <SubmitStep />,
];

export const ScanPage: FC<ScanPageProps> = ({}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [step, setStep] = useState(Number(searchParams.get("step")) || 0);
    const { message } = App.useApp();
    const supplyState = useAppSelector((state) => state.employee.scan);
    const { isPending, mutateAsync } = acceptSupplyMutation();
    const onSubmit = () => {
        if (!supplyState.supplyId) {
            message.error("SupplyId is not defined");
            return;
        }
        const values: AcceptSupplyProductRequest = {
            supplyId: supplyState.supplyId,
            productCells: [],
        };
        supplyState.cells.forEach((cell) => {
            const tempValue = {
                cellCode: `${cell.barcode}`,
                productArticles: cell.products.map((product) => `${product}`),
            };

            values.productCells.push(tempValue);
        });
        mutateAsync(values);
    };
    function nextStep() {
        setSearchParams({ step: `${step + 1}` });
        setStep((prev) => {
            return prev + 1;
        });
    }

    return (
        <div className="min-h-full bg-white rounded-t-sm">
            <div className="p-2">
                <h1 className="pb-2 text-lg font-semibold">Scan</h1>
                <Steps
                    className="!mb-4 text-sm"
                    current={step}
                    items={[
                        {
                            title: "Scan box",
                        },
                        {
                            title: "Scan cell",
                        },
                        {
                            title: "Scan products",
                        },
                        {
                            title: "Submit",
                        },
                    ]}
                />
                {steps[step]}
                <div className={cn("flex justify-end gap-4")}>
                    {step !== 0 && (
                        <Button
                            className={cn("")}
                            onClick={() => {
                                setSearchParams({ step: `${step - 1}` });
                                setStep((prev) => {
                                    return prev - 1;
                                });
                            }}
                        >
                            Previous
                        </Button>
                    )}
                    {step !== steps.length - 1 && (
                        <Button
                            className={cn("")}
                            onClick={nextStep}
                            type="primary"
                        >
                            Next
                        </Button>
                    )}
                    {step === steps.length - 1 && (
                        <Button
                            className={cn("")}
                            onClick={onSubmit}
                            type="primary"
                            loading={isPending}
                        >
                            Submit
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
