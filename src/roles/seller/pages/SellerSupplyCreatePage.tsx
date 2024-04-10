import { GetBoxResponse } from "@/modules/box/types";
import { useGetStore } from "@/modules/store/queries";
import { SupplyPDFModal } from "@/modules/supply/components/SupplyPDF/SupplyPDFModal";
import { createSupplyMutation } from "@/modules/supply/mutations";
import { CreateSupplyRequest } from "@/modules/supply/types";
import { useAppDispatch } from "@/redux/utils";
import { cn } from "@/utils/shared.util";
import { PrinterOutlined } from "@ant-design/icons";
import { App, Button, Steps } from "antd";
import { FC, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
    AddProductsStep,
    ChooseDateAndStoreStep,
    PackProductsStep,
    PrintStep,
} from "../../../modules/supply/components/SupplyCreateSteps";
import {
    saveDateAndStore,
    savePacks,
    saveProducts,
    setSupplyId,
} from "../redux/supply/actions";
import { SupplyState } from "../redux/supply/reducer";
import { useSupply, useSupplyPacks } from "../redux/supply/selectors";
import { PackProduct } from "../types/supply";

interface SellerSupplyCreatePageProps {}
const steps = [
    <AddProductsStep />,
    <ChooseDateAndStoreStep />,
    <PackProductsStep />,
    <PrintStep />,
];

function mapCreateSupplyRequest(
    supply: SupplyState,
    packs: {
        products: PackProduct[];
        box: GetBoxResponse;
        id: string;
    }[]
): CreateSupplyRequest {
    const selectedBoxes: {
        selectedBoxId: number;
        productId: number;
        quantity: number;
    }[] = [];
    packs.forEach((pack) => {
        pack.products.forEach((product) => {
            selectedBoxes.push({
                selectedBoxId: Number(pack.box),
                productId: product.product.id,
                quantity: product.quantity,
            });
        });
    });
    var parts: any = supply?.date?.split("-");

    var date = new Date(parts[2], parts[1] - 1, parts[0]);

    return {
        storeId: Number(supply.store),
        selectedTime: date.toISOString(),
        selectedBoxes,
    };
}

export const SellerSupplyCreatePage: FC<SellerSupplyCreatePageProps> = ({}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [step, setStep] = useState(Number(searchParams.get("step")) || 0);
    const dispatch = useAppDispatch();
    const supply = useSupply();
    const packs = useSupplyPacks();
    const handledPacks = packs
        .filter(
            (pack) =>
                pack.products.reduce(
                    (acum, current) => acum + current.quantity,
                    0
                ) > 0
        )
        .map((pack) => ({
            ...pack,
            products: pack.products.filter((product) => product.quantity > 0),
        }));
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
        } else if (step === 2) {
            if (supply.packs.length === 0) {
                message.error("Please create packs");
                return;
            }
            dispatch(savePacks());
        }

        setSearchParams({ step: `${step + 1}` });
        setStep((prev) => {
            return prev + 1;
        });
    }
    // @ts-ignore
    const { data: store } = useGetStore(supply?.store || -1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { mutateAsync, isPending } = createSupplyMutation((id) => {
        dispatch(setSupplyId(id));
    });

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
                        {
                            title: "Print",
                            icon: <PrinterOutlined />,
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
                    {step === steps.length - 1 &&
                        supply.supplyServerId == null && (
                            <Button
                                className={cn("")}
                                size="large"
                                loading={isPending}
                                onClick={() => {
                                    mutateAsync(
                                        mapCreateSupplyRequest(
                                            supply,
                                            handledPacks
                                        )
                                    );
                                }}
                                type="primary"
                            >
                                Create
                            </Button>
                        )}
                    {step === steps.length - 1 && supply.supplyServerId && (
                        <Button
                            className={cn("")}
                            size="large"
                            loading={isPending}
                            onClick={() => {
                                setIsModalOpen(true);
                            }}
                            type="primary"
                        >
                            Print
                        </Button>
                    )}
                    {isModalOpen && store && supply.supplyServerId && (
                        <SupplyPDFModal
                            store={store}
                            setIsModalOpen={setIsModalOpen}
                            isModalOpen={isModalOpen}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};
