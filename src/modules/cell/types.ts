export interface GetCellResponse {
    id: number;
    storeId: number;
    row: number;
    column: number;
    number: number;
}

export interface CreateCellRequest {
    storeId: number;
    row: number;
    column: number;
    number: number;
}
