import { useGetStore } from "@/modules/store/queries";
import { useAppDispatch } from "@/redux/utils";
import { cn } from "@/utils/shared.util";
import { PrinterOutlined } from "@ant-design/icons";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { App, Button, Modal, Steps } from "antd";
import { FC, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
    AddProductsStep,
    ChooseDateAndStoreStep,
    PackProductsStep,
    PrintStep,
} from "../../../modules/supply/components/SupplyCreateSteps";
import { SupplyPDF } from "../../../modules/supply/components/SupplyPDF";
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
    <PrintStep />,
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
                    {step === steps.length - 1 && (
                        <Button
                            className={cn("")}
                            size="large"
                            onClick={() => {
                                message.success("Supply created");
                                setIsModalOpen(true);
                            }}
                            type="primary"
                        >
                            Print
                        </Button>
                    )}
                    <Modal
                        open={isModalOpen}
                        onCancel={() => {
                            setIsModalOpen(false);
                        }}
                        footer={(_, { CancelBtn }) => (
                            <div className="flex items-center justify-end gap-4">
                                <CancelBtn />
                                <PDFDownloadLink
                                    document={
                                        <SupplyPDF
                                            supply={supply}
                                            store={store}
                                        />
                                    }
                                    fileName={`Supply-${Date.now()}.pdf`}
                                >
                                    {({ loading }) =>
                                        loading
                                            ? "Loading document..."
                                            : "Download now!"
                                    }
                                </PDFDownloadLink>
                            </div>
                        )}
                        title="Print"
                    >
                        <PDFViewer
                            showToolbar={true}
                            width={"100%"}
                            height={"100%"}
                        >
                            <SupplyPDF supply={supply} store={store} />
                        </PDFViewer>
                    </Modal>
                </div>
            </div>
        </div>
    );
};
