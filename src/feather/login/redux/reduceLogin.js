import { actionTypeLogin } from "./type";

const { default: produce } = require("immer")

const initailState = {
    profile: null,
}
const reduce = (state = initailState, { type, payload }) => {
    return produce(state, draft => {
        switch (type) {
            case actionTypeLogin.POST_LOGIN:
                draft.profile = payload;
                break;

            default:
                break;
        }
    })
}

export default reduce;