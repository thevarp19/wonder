import { AntdProvider } from "@/context/AntdProvider.tsx";
import { QueryProvider } from "@/context/QueryProvider.tsx";
import { RouterProvider } from "@/context/RouterProvider.tsx";
import "@/styles/index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryProvider>
                <AntdProvider>
                    <RouterProvider />
                </AntdProvider>
            </QueryProvider>
        </BrowserRouter>
    </React.StrictMode>
);
