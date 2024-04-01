import { useAppDispatch } from "@/redux/utils";
import { cn } from "@/utils/shared.util";
import { App, Button, Steps } from "antd";
import { FC, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
    AddProductsStep,
    ChooseDateAndStoreStep,
    PackProductsStep,
} from "../components/supply/steps";
import {
    saveDateAndStore,
    savePacks,
    saveProducts,
} from "../redux/supply/actions";
import { useSupply } from "../redux/supply/selectors";

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
    const supply = useSupply();
    const { message } = App.useApp();
    function nextStep() {
        if (step === 0) {
            if (supply.products.length === 0) {
                message.error("Please add products");
                return;
            }
            dispatch(saveProducts());
        } else if (step === 1) {
            if (!supply.store || !supply.date) {
                message.error("Please choose store and date");
                return;
            }
            dispatch(saveDateAndStore());
        }

        setSearchParams({ step: `${step + 1}` });
        setStep((prev) => {
            return prev + 1;
        });
    }
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
                            onClick={nextStep}
                            type="primary"
                        >
                            Save
                        </Button>
                    )}
                    {step === steps.length - 1 && (
                        <Button
                            className={cn("")}
                            size="large"
                            onClick={() => {
                                dispatch(savePacks());
                                message.success("Supply created");
                            }}
                            type="primary"
                        >
                            Finish
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};
