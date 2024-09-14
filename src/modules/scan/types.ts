export interface GetScanInfo {
    supply_box_id: number;
    supply: number;
    store_name: string;
    product_count: number;
    vendor_code_count: number;
    supply_box_count: number;
    products: {
        product_name: string;
        count: number;
    }[];
}
export interface GetCellInfo {
    id: number;
    products: {
        id: number;
        title: string;
    }[];
    line: number;
    row: number;
    col: number;
    length: number;
    width: number;
    height: number;
    comment: string;
}
