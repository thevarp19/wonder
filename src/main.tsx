"use strict";
import { AntdProvider } from "@/context/AntdProvider.tsx";
import { QueryProvider } from "@/context/QueryProvider.tsx";
import { RouterProvider } from "@/context/RouterProvider.tsx";
import "@/styles/index.css";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ErrorBoundary>
            <BrowserRouter>
                <Provider store={store}>
                    <QueryProvider>
                        <AntdProvider>
                            <RouterProvider />
                        </AntdProvider>
                    </QueryProvider>
                </Provider>
            </BrowserRouter>
        </ErrorBoundary>
    </React.StrictMode>
);
