export interface GetBoxResponse {
    id: number;
    title: string;
    length: number;
    width: number;
    height: number;
}

export interface CreateBoxRequest {
    title: string;
    length: number;
    width: number;
    height: number;
}
