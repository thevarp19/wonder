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
