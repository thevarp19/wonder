export interface GetCellResponse {
    id: number;
    row: number;
    col: number;
    line: number;
    length?: number;
    width?: number;
    height?: number;
    comment?: string;
}

export interface CreateCellRequest {
    row: number;
    col: number;
    line: number;
    length?: number;
    width?: number;
    height?: number;
    comment?: string;
}

export interface UpdateCellRequest {
    row: number;
    col: number;
    line: number;
    length?: number;
    width?: number;
    height?: number;
    comment?: string;
}
