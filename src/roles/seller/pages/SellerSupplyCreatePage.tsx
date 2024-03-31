import { useAppDispatch } from "@/redux/utils";
import { cn } from "@/utils/shared.util";
import { Button, Steps } from "antd";
import { FC, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
    AddProductsStep,
    ChooseDateAndStoreStep,
    PackProductsStep,
} from "../components/supply/steps";
import { saveDateAndStore, saveProducts } from "../redux/supply/actions";

interface SellerSupplyCreatePageProps {}
const steps = [
    <AddProductsStep />,
    <ChooseDateAndStoreStep />,
    <PackProductsStep />,
];
export const SellerSupplyCreatePage: FC<SellerSupplyCreatePageProps> = ({}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [step, setStep] = useState(Number(searchParams.get("step")) || 0);
    const dispatch = useAppDispatch();
    return (
        <div className="min-h-full bg-white rounded-t-lg">
            <div className="p-4">
                <h1 className="pb-4 text-2xl font-semibold">Supply</h1>
                <Steps
                    responsive={false}
                    className="!mb-10"
                    current={step}
                    items={[
                        {
                            title: "Add products",
                        },
                        {
                            title: "Choose store and date",
                        },
                        {
                            title: "Pack products",
                        },
                    ]}
                />
                {steps[step]}
                <div className={cn("flex justify-end gap-4")}>
                    {step !== 0 && (
                        <Button
                            className={cn("")}
                            size="large"
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
                            size="large"
                            onClick={() => {
                                dispatch(saveProducts());
                                dispatch(saveDateAndStore());
                                setSearchParams({ step: `${step + 1}` });
                                setStep((prev) => {
                                    return prev + 1;
                                });
                            }}
                            type="primary"
                        >
                            Save
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
