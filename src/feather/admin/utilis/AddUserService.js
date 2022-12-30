import { PATH_API } from "app/pathAPi"

const { default: requestAPI } = require("app/callApi")


export const GetListTypeUser = async () => {
    try {
        const res = await requestAPI({
            method: 'get',
            url: '/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung'
        })
        return res
    } catch (error) {
        console.log(error)
    }
}
export const GetInformationUser = async (matk) => {
    try {
        const res = await requestAPI({
            method: 'post',
            url: PATH_API.LINK_INFOR_USER,
            params: {
                taiKhoan: matk
            }
        })
        return res;
    } catch (error) {
        console.log(error)
    }
}