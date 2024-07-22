import { GetBoxResponse } from "@/modules/box/types";
// import { SupplyPDFModal } from "@/modules/supply/components/SupplyPDF/SupplyPDFModal";
import { createSupplyMutation } from "@/modules/supply/mutations";
import { CreateSupplyRequest } from "@/modules/supply/types";
import { useAppDispatch } from "@/redux/utils";
import { cn } from "@/utils/shared.util";
import { PrinterOutlined } from "@ant-design/icons";
import { App, Button, Steps } from "antd";
import { FC, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
    AddProductsStep,
    ChooseDateAndStoreStep,
    PackProductsStep,
    PrintStep,
} from "../../../modules/supply/components/SupplyCreateSteps";
import {
    reset,
    saveDateAndStore,
    savePacks,
    saveProducts,
    setReportPath,
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
    const supply_boxes: {
        box: number;
        supplier_box_products: { seller_product: number; quantity: number }[];
    }[] = [];

    packs.forEach((pack) => {
        const box = Number(pack.box);
        const supplier_box_products: {
            seller_product: number;
            quantity: number;
        }[] = [];
        pack.products.forEach((product) => {
            supplier_box_products.push({
                seller_product: Number(product.product.id),
                quantity: product.quantity,
            });
        });
        supply_boxes.push({ box, supplier_box_products });
    });
    const parts: any = supply?.date?.split("-");

    return {
        seller_warehouse: Number(supply.store?.id),
        date: `${parts?.[2]}-${parts?.[1]}-${parts?.[0]}`,
        supply_boxes,
    };
}

export const SellerSupplyCreatePage: FC<SellerSupplyCreatePageProps> = ({}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const serverId = useSupply().supplyServerId;
    const [step, setStep] = useState(
        serverId ? 3 : Number(searchParams.get("step")) || 0
    );
    const dispatch = useAppDispatch();
    const supply = useSupply();
    const navigate = useNavigate();
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
                message.error("Пожалуйста, добавьте продукты");
                return;
            }
            dispatch(saveProducts());
        } else if (step === 1) {
            if (!supply.store || !supply.date) {
                message.error("Пожалуйста, выберите склад и дату");
                return;
            }
            const parts = supply.date.split("-");
            const formattedDate = `${parts?.[2]}-${parts?.[1]}-${parts?.[0]}`;
            if (new Date(formattedDate) <= new Date()) {
                message.error("Пожалуйста, выберите склад и дату");
                return;
            }
            dispatch(saveDateAndStore());
        } else if (step === 2) {
            if (supply.packs.length === 0) {
                message.error("Пожалуйста, создайте упаковки");
                return;
            }
            dispatch(savePacks());
        }

        setSearchParams({ step: `${step + 1}` });
        setStep((prev) => {
            return prev + 1;
        });
    }
    const { mutateAsync, isPending } = createSupplyMutation(
        (id, reportPath) => {
            dispatch(setSupplyId(id));
            dispatch(setReportPath(reportPath));
        }
    );

    return (
        <div className="min-h-full bg-white rounded-t-lg">
            <h1 className="pb-4 text-2xl font-semibold">Поставка</h1>
            <Steps
                responsive={false}
                className="!mb-10"
                current={step}
                items={[
                    {
                        title: "Добавить продукты",
                    },
                    {
                        title: "Выбрать склад и дату",
                    },
                    {
                        title: "Упаковать продукты",
                    },
                    {
                        title: "Печать",
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
                            if (serverId) {
                                return;
                            }
                            setSearchParams({ step: `${step - 1}` });
                            setStep((prev) => {
                                return prev - 1;
                            });
                        }}
                    >
                        Назад
                    </Button>
                )}
                {step !== steps.length - 1 && (
                    <Button
                        className={cn("")}
                        size="large"
                        onClick={nextStep}
                        type="primary"
                    >
                        Сохранить
                    </Button>
                )}
                {step === steps.length - 1 && supply.supplyServerId == null && (
                    <Button
                        className={cn("")}
                        size="large"
                        loading={isPending}
                        onClick={() => {
                            mutateAsync(
                                mapCreateSupplyRequest(supply, handledPacks)
                            );
                        }}
                        type="primary"
                    >
                        Создать
                    </Button>
                )}
                {step === steps.length - 1 && supply.supplyServerId && (
                    <Link target="_blank" to={supply.pathToReport ?? ""}>
                        <Button
                            className={cn("")}
                            size="large"
                            loading={isPending}
                            onClick={() => {
                                setTimeout(() => {
                                    dispatch(reset());
                                    navigate("/seller/supply");
                                }, 500);
                            }}
                            type="primary"
                        >
                            Печать
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
};
