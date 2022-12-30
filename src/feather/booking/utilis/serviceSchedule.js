const { default: requestAPI } = require("app/callApi")


export const getInfoScheduleCinema = async (mahethongrap) => {
    try {
        const res = await requestAPI({
            method: 'GET',
            url: `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${mahethongrap}&maNhom=GP01`
        })
        return res
    } catch (error) {
        console.log(error)
    }

}