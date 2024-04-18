export interface ScanState {
    boxId: number | null;
    cells: {
        id: number;
        products: number[];
    }[];
}

export const UPDATE_BOX = "SCAN_UPDATE_BOX";

export interface UpdateBox {
    type: typeof UPDATE_BOX;
    payload: number | null;
}

export type EmployeeAuthActions = UpdateBox;
