import { GetCellResponse } from "./types";

export function mapCreateCellToUpdate(cell: GetCellResponse) {
    return {
        ...cell,
    };
}
