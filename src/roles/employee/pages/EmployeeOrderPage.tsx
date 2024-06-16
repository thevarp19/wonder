// import { AdminOrderDetailsTable } from "@/modules/order/components/OrderDetailsTable.tsx/EmployeeOrderTable";
import { assembleProducts } from "@/modules/order/api";
import { EmployeeOrderDetailsTable } from "@/modules/order/components/OrderDetailsTable.tsx/EmployeeOrderDetailsTable";
import {
    finishAssembleMutation,
    finishPackageMutation,
    packageProductsMutation,
    startAssembleMutation,
    startPackageMutation,
} from "@/modules/order/mutations";
import { useGetEmployeeOrder } from "@/modules/order/queries";
import { useScannerMultipleResults } from "@/modules/scan/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { App, Button, Spin } from "antd";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";

interface EmployeeOrderPageProps {}
const createStatusConfig = (mutations: any, values: any) => ({
    ASSEMBLY_NOT_STARTED: {
        text: "Собрать заказ",
        disabled: false,
        action: () => {
            mutations.startAssembly();
        },
    },
    ASSEMBLY_IN_PROGRESS: {
        text: (
            <div className="flex items-center gap-2">
                Идет сборка
                <Spin size="small" />
            </div>
        ),
        disabled: true,
        action: () => {},
    },
    READY_TO_FINISH_ASSEMBLY: {
        text: "Завершить сборку",
        disabled: false,
        action: () => {
            mutations.finishAssemble();
        },
    },
    PACKAGING_NOT_STARTED: {
        text: "Начать упаковку",
        disabled: false,
        action: () => {
            mutations.startPackage();
        },
    },
    PACKAGING_IN_PROGRESS: {
        text: "Упаковать товары",
        disabled: values.selectedRowKeys.length === 0,
        action: () => {
            mutations.packageProducts({
                productArticles: values.selectedRowKeys,
            });
        },
    },
    READY_TO_FINISH_PACKAGING: {
        text: (
            <div className="flex items-center gap-2">
                Идет упаковка
                <Spin size="small" />
            </div>
        ),
        disabled: true,
        action: () => {},
    },
    READY_TO_SHIP_TO_COURIER: {
        text: "Готово к отправке, ожидание курьера",
        disabled: true,

        action: () => {},
    },
    READY_TO_SHIP_TO_COURIER_EXPRESS: {
        text: "Готово к отправке экспресс, ожидание курьера",
        disabled: true,
        action: () => {},
    },
    READY_TO_SHIP_TO_ZAMMLER: {
        text: "Готово к отправке, ожидание заммлера",
        disabled: true,
        action: () => {},
    },
    READY_TO_SHIP_TO_CLIENT: {
        text: "Готово к отправке, ожидание клиента",
        disabled: true,
        action: () => {},
    },
    READY_TO_SHIP: {
        text: "Готов к отправке, наша доставка",
        disabled: true,
        action: () => {},
    },

    UNKNOWN_STATUS: {
        text: "Невозможно определить статус",
        disabled: true,
        action: () => {},
    },
});
export const EmployeeOrderPage: FC<EmployeeOrderPageProps> = ({}) => {
    const { orderId: orderIdRaw } = useParams();
    const orderId = useMemo(() => parseInt(orderIdRaw || ""), [orderIdRaw]);
    let scannedProducts = useScannerMultipleResults();
    const queryClient = useQueryClient();
    const { message } = App.useApp();
    const hasCalledEffect = useRef(false);
    const { data, isPending } = useGetEmployeeOrder(orderId);
    const { mutateAsync: startAssembly } = startAssembleMutation(orderId);
    const { mutateAsync: finishAssemble } = finishAssembleMutation(orderId);
    const { mutateAsync: startPackage } = startPackageMutation(orderId);
    const { mutateAsync: packageProducts } = packageProductsMutation(orderId);
    const { mutateAsync: finishPackage } = finishPackageMutation(orderId);

    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
    const onSelectChange = (newSelectedRowKeys: string[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
        console.log("selectedRowKeys changed", newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const hasSelected = selectedRowKeys.length > 0;

    const mutations = {
        startAssembly,
        finishAssemble,
        startPackage,
        finishPackage,
        packageProducts,
    };
    const values = {
        selectedRowKeys,
    };
    const newSearchParams = new URLSearchParams(window.location.search);
    const renderButton = (
        orderStatus: keyof ReturnType<typeof createStatusConfig>
    ) => {
        const statusConfig = createStatusConfig(mutations, values);
        const config = statusConfig[orderStatus] || statusConfig.UNKNOWN_STATUS;

        return (
            <Button
                type="primary"
                size="large"
                onClick={config.action}
                disabled={config.disabled}
            >
                {config.text}
            </Button>
        );
    };
    const orderStatus =
        (data?.orderStatus as keyof ReturnType<typeof createStatusConfig>) ||
        "UNKNOWN_STATUS";
    useEffect(() => {
        if (hasCalledEffect.current) return;

        const assembleProductsHandler = async () => {
            if (scannedProducts.length > 0) {
                try {
                    await assembleProducts(orderId, {
                        productArticles: scannedProducts,
                    });

                    queryClient.invalidateQueries({
                        queryKey: [`order-employee-${orderId}`],
                    });
                    message.success("Продукты отправлены.");
                } catch (error) {
                    message.error("Ошибка при отправке продуктов.");
                } finally {
                    newSearchParams.delete("result");
                    newSearchParams.delete("type");
                    newSearchParams.delete("step");
                    const newUrl = `${
                        window.location.pathname
                    }?${newSearchParams.toString()}`;
                    window.history.replaceState(null, "", newUrl);
                }
            }
        };

        assembleProductsHandler();
        hasCalledEffect.current = true;
    }, [scannedProducts]);

    return (
        <div>
            <h1 className="pb-4 text-2xl font-semibold">
                Заказ- <span className="underline">{orderId}</span>
            </h1>
            <div className="flex justify-end">
                {isPending ? <Spin /> : renderButton(orderStatus)}
            </div>
            <EmployeeOrderDetailsTable
                orderId={orderId}
                data={data}
                loading={isPending}
                selectedRowKeys={selectedRowKeys}
                hasSelected={hasSelected}
                rowSelection={rowSelection}
                finishPackage={finishPackage}
            />
        </div>
    );
};
