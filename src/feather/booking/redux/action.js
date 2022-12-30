import { type } from "@testing-library/user-event/dist/type"
import requestAPI from "app/callApi"
import { actionType } from "./type"


const { PATH_API } = require("app/pathAPi")

//asyn action lấy danh sách banners
export const fetchListBannerAction = async (next) => {
    try {
        const res = await requestAPI({
            url: PATH_API.LINK_BANNERS,
            method: 'get'
        })
        next({
            type: actionType.SHOW_BANNERS,
            payload: res.data.content
        })
    } catch (error) {
        console.log(error)
    }
}
//lấy danh sách phim theo phấn trang
export const fetchListMovie = (page = 1) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                method: 'get',
                url: PATH_API.LINK_lIST_MOVIE,
                params: {
                    maNhom: 'GP10',
                    soTrang: page,
                    soPhanTuTrenTrang: 8
                }
            })
            next({
                type: actionType.SHOW_LIST_MOVIE,
                payload: res.data.content
            })
        } catch (error) {
            console.log(error)
        }
    }
}
//lấy chi tiết phim
export const fetchDetailMovieAction = (id) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                method: 'GET',
                url: PATH_API.LINK_DETAIL_MOVIE,
                params: {
                    MaPhim: id
                }
            })
            next({
                type: actionType.SHOW_DETAIL_MOVIE,
                payload: res.data.content
            })
        } catch (error) {
            console.log(error)
        }
    }
}

//action lấy lich chiếu phim
export const fetchScheduleMovie = (id) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                method: 'GET',
                url: PATH_API.LINK_SCHEDULE_MOVIE,
                params: {
                    MaPhim: id
                }
            })
            next({
                type: actionType.SHOW_SCHEDULE_MOVIE,
                payload: res.data.content
            })
        } catch (error) {
            console.log(error)
        }
    }
}
//actin lấy list ghế show lên
export const fetchListRoomTicket = (id) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                method: 'GET',
                url: PATH_API.LINK_ROOM_TICKET,
                params: {
                    MaLichChieu: id
                }
            })
            next({
                type: actionType.SHOW_LIST_ROOM_TICKET,
                payload: res.data.content
            })
        } catch (error) {
            console.log(error)
        }
    }
}
//action đang kí ghế sau thanh toán
export const fetchListTicked = (list) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                method: 'POST',
                url: PATH_API.LINK_TICKKED,
                data: list
            })
            next({
                type: actionType.SET_BOOKING_TICKET
            })
            alert(res.data.content)
        } catch (error) {
            console.log(error)
        }
    }
}

//action lấy thông tin hệ thống rạp
export const fetchScheduleCinemaAction = async (next) => {
    try {
        const res = await requestAPI({
            method: 'GET',
            url: PATH_API.LINK_SCHEDULE_CINEMA
        })
        next({
            type: actionType.SHOW_LIST_SCHEDULE_CINEMA,
            payload: res.data.content
        })
    } catch (error) {
        console.log(error)
    }
}