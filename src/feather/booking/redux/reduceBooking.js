
import produce from "immer"
import { actionType } from "./type";
const initailState = {
    Banner_movie: [],
    Movie_list: {},
    Movie_list_temporate: {},
    DangChieu: null,
    SapChieu: null,
    Detail: {},
    Schedule_movie: [],
    List_room_ticket: [],
    List_room_ticket_booking: [],
    List_Schedule_Cinema:[],
}

const reduce = (state = initailState, { type, payload }) => {
    return produce(state, darft => {
        switch (type) {
            case actionType.SHOW_BANNERS:
                darft.Banner_movie = payload;
                break;
            case actionType.SHOW_LIST_MOVIE:
                darft.Movie_list = payload;
                darft.Movie_list_temporate = darft.Movie_list;
                break;
            case actionType.SHOW_DANGCHIEU:
                darft.DangChieu = true;
                darft.SapChieu = false;
                darft.Movie_list_temporate = darft.Movie_list.items.filter(item => item.dangChieu === true);
                darft.Movie_list = { ...darft.Movie_list, items: darft.Movie_list_temporate }
                break;
            case actionType.SHOW_SAPCHIEU:
                darft.DangChieu = false;
                darft.SapChieu = true;
                darft.Movie_list_temporate = darft.Movie_list.items.filter(item => item.sapChieu === true);
                darft.Movie_list = { ...darft.Movie_list, items: darft.Movie_list_temporate }
                break;
            case actionType.SHOW_DETAIL_MOVIE:
                darft.Detail = payload;
                break;
            case actionType.SHOW_SCHEDULE_MOVIE:
                darft.Schedule_movie = payload;
                break;
            case actionType.SHOW_LIST_ROOM_TICKET:
                darft.List_room_ticket = payload;
                break;
            case actionType.SHOW_LIST_ROOM_TICKET_BOOKING:
                const index = darft.List_room_ticket_booking.findIndex(item => (item.maGhe === payload.maGhe))
                if (index === -1) {
                    darft.List_room_ticket_booking.push(payload)
                }
                else {
                    darft.List_room_ticket_booking.splice(index, 1)
                }
                break;
                case actionType.SET_BOOKING_TICKET:
                    darft.List_room_ticket_booking = [];
                    break;
                    case actionType.SHOW_LIST_SCHEDULE_CINEMA:
                        darft.List_Schedule_Cinema = payload;
                        break;

            default:
                break;
        }
    });
}


export default reduce;