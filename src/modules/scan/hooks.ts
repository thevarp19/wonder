import { useSearchParams } from "react-router-dom";

export function useScannerResults() {
    const [searchParams] = useSearchParams();
    return searchParams.get("result") || "";
}

export function useScannerMultipleResults() {
    const [searchParams] = useSearchParams();
    return searchParams.getAll("result");
}
