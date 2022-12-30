import { actionTypeAdmin } from "./type"

const { default: requestAPI } = require("app/callApi")
const { PATH_API } = require("app/pathAPi")


export const fetchManagerFilmAction = (tenphim = "") => {
    let url = "";
    if (tenphim.trim() === "") {
        url = "/api/QuanLyPhim/LayDanhSachPhim"
    }
    else {
        url = `/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01&tenPhim=${tenphim}`
    }
    return async (next) => {
        try {
            const res = await requestAPI({
                method: 'GET',
                url: url
            })
            next({
                type: actionTypeAdmin.MANAGER_FILM,
                payload: res.data.content
            })
        } catch (error) {
            console.log(error)
        }
    }

}
//fetch them phiem
export const fetchAddFilmAction = (film) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                method: 'POST',
                url: PATH_API.LINK_ADD_FILM,
                data: film
            })
            console.log(res.data)
            alert("bạn đã thêm phim thành công")
        } catch (error) {
            console.log(error)
        }
    }
}
//update phim
export const fetchUPdateFilmAction = (formdata) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                method: 'post',
                url: PATH_API.LINK_UPDATE_FILM,
                data: formdata
            })
            alert("cập nhập thành công")
        } catch (error) {
            console.log(error)
        }
    }
}
//actio xoá phim
export const fetchDeleteFilmAction = (maphim) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                method: 'DELETE',
                url: PATH_API.LINK_DELETE_FILM,
                params: {
                    MaPhim: maphim
                }
            })
            alert("xoá phim thành công")
        } catch (error) {
            console.log(error)
        }
    }
}

//them lịch chiếu
export const fetchAddScheduleACtion = (data) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                method: "POST",
                url: PATH_API.LINK_ADD_SCHEDULE,
                data: data
            })
            alert("them lich chiếu thành công")
        } catch (error) {

            alert(error.response.data.content)
        }
    }
}

//lấy danh sách người dùng
export const fetchListUserAction = (tukhoa = "") => {
    let url = "";
    if (tukhoa.trim() === "") {
        url = 'api/QuanLyNguoiDung/LayDanhSachNguoiDung'

    }
    else {
        url = `/api/QuanLyNguoiDung/LayDanhSachNguoiDung?tuKhoa=${tukhoa}`
    }
    return async (next) => {
        try {
            const res = await requestAPI({
                method: "GET",
                url: url
            })
            next({
                type: actionTypeAdmin.POST_LIST_USER,
                payload: res.data.content
            })
        } catch (error) {
            console.log(error)
        }
    }
}
//xoa user
export const fetchDeleteUserAction = (user) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                method: 'DELETE',
                url: PATH_API.LINK_DELETE_USER,
                params: {
                    TaiKhoan: user
                }
            })

            console.log(res.data)
        } catch (error) {
            console.log(error)
            alert(error.response.data.content)
        }
    }
}

//thêm nguồi dung
export const fetchAddUserAction = (user) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                method: 'POST',
                url: PATH_API.LINK_ADD_USER,
                data: user
            })
            alert("đả them thành công")
        } catch (error) {

            alert(error.response.data.content)
        }
    }
}
//edit nguyời dùng
export const fetchEditUserAction = (user) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                method: 'PUT',
                url: PATH_API.LINK_EDIT_UESR,
                data: user
            })
            alert("bạn update thành công")
        } catch (error) {
            console.log(error)
            alert(error.response.data.content)
        }
    }
}
