import { actionTypeAdmin } from "./type";

const { default: produce } = require("immer")

const initailState = {
    adminFilm: [],
    list_users: [],
}

const reduce = (state = initailState, { type, payload }) => {
    return produce(state, draft => {
        switch (type) {
            case actionTypeAdmin.MANAGER_FILM:
                draft.adminFilm = payload;
                break;
            case actionTypeAdmin.POST_LIST_USER:
                draft.list_users = payload;
                break;
            default:
                break;
        }
    })
}

export default reduce;