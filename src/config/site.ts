export const baseURL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:8181";
export const baseAutoUploadURL =
    import.meta.env.VITE_AUTOUPLOAD_URL || "http://localhost:8181";

export const scannerUrl =
    import.meta.env.VITE_SCANNER_URL ||
    "http://127.0.0.1:5500/index.html?mode=dev";
