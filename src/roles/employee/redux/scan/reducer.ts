import * as actionTypes from "./types";

const INITIAL_STATE: actionTypes.ScanState = {
    boxId: null,
    cells: [],
};

export const employeeAuthReducer = (
    state = INITIAL_STATE,
    action: actionTypes.EmployeeAuthActions
): typeof INITIAL_STATE => {
    switch (action.type) {
        case actionTypes.UPDATE_BOX:
            return {
                ...state,
                boxId: action.payload,
            };
        default:
            return state;
    }
};
