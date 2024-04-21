export interface GetCellResponse {
    id: number;
    row: number;
    col: number;
    cell: number;
    comment?: string;
    width?: number;
    height?: number;
    depth?: number;
}

export interface CreateCellRequest {
    storeId: number;
    row: number;
    col: number;
    cell: number;
    comment?: string;
    width?: number;
    height?: number;
    depth?: number;
}
