const { default: requestAPI } = require("app/callApi")
const { PATH_API } = require("app/pathAPi")


export const getInfoSystemMovie = async () => {
    try {
        const res = await requestAPI({
            method: "get",
            url: "/api/QuanLyRap/LayThongTinHeThongRap",

        })
        return res
    } catch (error) {
        console.log(error)
    }
}


export const getInforCumRapTheoHeThong =(value)=>{
    const res=requestAPI({
        method:'get',
        url:"/api/QuanLyRap/LayThongTinCumRapTheoHeThong",
        params:{
            maHeThongRap:value
        }
    })
    return res
}