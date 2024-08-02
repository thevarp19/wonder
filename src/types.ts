export interface BasePaginationResponse<T> {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
    content: T[];
}

export interface BasePaginationProductsSizesResponse<T> {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
    content: T;
}
export type MenuItemType = {
    label: JSX.Element;
    key: string;
    icon?: JSX.Element;
    children?: MenuItemType[];
};
