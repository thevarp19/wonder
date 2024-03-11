import { FC } from "react";
import { Route, Routes } from "react-router-dom";

interface RouterProviderProps {}

export const RouterProvider: FC<RouterProviderProps> = ({}) => {
    return (
        <Routes>
            <Route path="/" element={<div>Hello world</div>}></Route>
        </Routes>
    );
};
