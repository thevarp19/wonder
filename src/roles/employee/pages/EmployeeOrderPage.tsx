// import { AdminOrderDetailsTable } from "@/modules/order/components/OrderDetailsTable.tsx/EmployeeOrderTable";

import { EmployeeOrderDetailsTable } from "@/modules/order/components/EmployeeOrders/EmployeeOrderDetailsTable";
import {} from "@/modules/order/mutations";
import { useGetEmployeeOrder } from "@/modules/order/queries";
import { useScannerMultipleResults } from "@/modules/scan/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { App, Button } from "antd";
import { FC, useEffect, useMemo, useRef } from "react";
import { Link, useParams } from "react-router-dom";

interface EmployeeOrderPageProps {}
// const createStatusConfig = (mutations: any) => ({
//     ASSEMBLY_NOT_STARTED: {
//         text: "Собрать заказ",
//         disabled: false,
//         action: () => {
//             mutations.startAssembly();
//         },
//     },
//     ASSEMBLY_IN_PROGRESS: {
//         text: (
//             <div className="flex items-center gap-2">
//                 Идет сборка
//                 <Spin size="small" />
//             </div>
//         ),
//         disabled: true,
//         action: () => {},
//     },
//     READY_TO_FINISH_ASSEMBLY: {
//         text: "Завершить сборку",
//         disabled: false,
//         action: () => {
//             mutations.finishAssemble();
//         },
//     },
//     PACKAGING_NOT_STARTED: {
//         text: "Начать упаковку",
//         disabled: false,
//         action: () => {
//             mutations.startPackage();
//         },
//     },
//     PACKAGING_IN_PROGRESS: {
//         text: (
//             <div className="flex items-center gap-2">
//                 Идет упаковка
//                 <Spin size="small" />
//             </div>
//         ),
//         disabled: true,
//         action: () => {},
//     },
//     READY_TO_FINISH_PACKAGING: {
//         text: <div className="flex items-center gap-2">Завершить упаковку</div>,
//         disabled: false,
//         action: () => {
//             mutations.finishPackage();
//         },
//     },
//     READY_TO_SHIP_TO_COURIER: {
//         text: "Готово к отправке, ожидание курьера",
//         disabled: true,

//         action: () => {},
//     },
//     READY_TO_SHIP_TO_COURIER_EXPRESS: {
//         text: "Готово к отправке экспресс, ожидание курьера",
//         disabled: true,
//         action: () => {},
//     },
//     READY_TO_SHIP_TO_ZAMMLER: {
//         text: "Готово к отправке, ожидание заммлера",
//         disabled: true,
//         action: () => {},
//     },
//     READY_TO_SHIP_TO_CLIENT: {
//         text: "Готово к отправке, ожидание клиента",
//         disabled: true,
//         action: () => {},
//     },
//     READY_TO_SHIP: {
//         text: "Готов к отправке, наша доставка",
//         disabled: true,
//         action: () => {},
//     },

//     UNKNOWN_STATUS: {
//         text: "Невозможно определить статус",
//         disabled: true,
//         action: () => {},
//     },
// });
export const EmployeeOrderPage: FC<EmployeeOrderPageProps> = ({}) => {
    const { orderId: orderIdRaw } = useParams();
    const orderId = useMemo(() => parseInt(orderIdRaw || ""), [orderIdRaw]);
    let scannedProducts = useScannerMultipleResults();
    const queryClient = useQueryClient();
    const { message } = App.useApp();
    const hasCalledEffect = useRef(false);
    const { data, isPending } = useGetEmployeeOrder(orderId);
    // const { mutateAsync: startAssembly } = startAssembleMutation(orderId);
    // const { mutateAsync: finishAssemble } = finishAssembleMutation(orderId);
    // const { mutateAsync: startPackage } = startPackageMutation(orderId);
    // const { mutateAsync: packageProducts } = packageProductsMutation(orderId);
    // const { mutateAsync: finishPackage } = finishPackageMutation(orderId);

    // const mutations = {
    //     startAssembly,
    //     finishAssemble,
    //     startPackage,
    //     finishPackage,
    //     packageProducts,
    // };

    const newSearchParams = new URLSearchParams(window.location.search);
    // const renderButton = (
    //     orderStatus: keyof ReturnType<typeof createStatusConfig>
    // ) => {
    //     // const statusConfig = createStatusConfig(mutations);
    //     // const config = statusConfig[orderStatus] || statusConfig.UNKNOWN_STATUS;

    //     return (
    //         <Button
    //             type="primary"
    //             size="large"
    //             onClick={config.action}
    //             disabled={config.disabled}
    //         >
    //             {config.text}
    //         </Button>
    //     );
    // };
    // const orderStatus =
    //     (data?.orderStatus as keyof ReturnType<typeof createStatusConfig>) ||
    //     "UNKNOWN_STATUS";
    useEffect(() => {
        if (hasCalledEffect.current) return;
        const assembleProductsHandler = async () => {
            if (scannedProducts.length > 0) {
                try {
                    // await assembleProducts(orderId, {
                    //     productArticles: scannedProducts,
                    // });

                    queryClient.invalidateQueries({
                        queryKey: [`order-employee-${orderId}`],
                    });
                    message.success("Продукты отправлены.");
                } catch (error) {
                    message.error("Ошибка при отправке продуктов.");
                }
            }
        };

        if (data?.orderStatus === "ASSEMBLY_IN_PROGRESS") {
            assembleProductsHandler();
        } else if (data?.orderStatus === "PACKAGING_IN_PROGRESS") {
            // packageProducts({ productArticles: scannedProducts });
        }
        newSearchParams.delete("result");
        newSearchParams.delete("type");
        newSearchParams.delete("step");
        const newUrl = `${
            window.location.pathname
        }?${newSearchParams.toString()}`;
        window.history.replaceState(null, "", newUrl);
        hasCalledEffect.current = true;
    }, [scannedProducts]);

    return (
        <div>
            <h1 className="pb-4 text-2xl font-semibold">
                Заказ- <span className="underline">{orderId}</span>
            </h1>
            <div className="flex justify-end gap-5 my-4">
                {(data?.orderStatus === "PACKAGING_IN_PROGRESS" ||
                    data?.orderStatus === "READY_TO_FINISH_PACKAGING") && (
                    <Link
                        target="_blank"
                        className="flex justify-center"
                        to={data?.waybill}
                    >
                        <Button size="large" type="primary">
                            Скачать накладную
                        </Button>
                    </Link>
                )}
                {/* {isPending ? <Spin /> : renderButton(orderStatus)} */}
            </div>
            <EmployeeOrderDetailsTable
                orderId={orderId}
                data={data}
                loading={isPending}
                // finishPackage={finishPackage}
            />
        </div>
    );
};
