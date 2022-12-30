
import requestAPI from "app/callApi"
import { actionTypeLogin } from "./type"


const { PATH_API } = require("app/pathAPi")


//action login 
export const fetchLoginAction = (user) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                url: PATH_API.LINK_LOGIN,
                method: "POST",
                data: user
            })
            localStorage.setItem("token", res.data.content.accessToken)
            next({
                type: actionTypeLogin.POST_LOGIN,
                payload: res.data.content
            })
        } catch (error) {
            throw (error)
        }
    }
}
//actioin set profile de reload lai trang
export const fetchProfileAction = async (next) => {
    try {
        const res = await requestAPI({
            method: 'post',
            url: PATH_API.LINK_PROFILE,

        })
        next({
            type: actionTypeLogin.POST_LOGIN,
            payload: res.data.content
        })
    } catch (error) {
        console.log(error)
    }
}
//action đang kí (signup)
export const fetchSignupAction = (user) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                method: "POST",
                url: PATH_API.LINK_SIGNUP,
                data: user
            })
            alert(res.data.message)
        } catch (error) {
            throw (error)
        }
    }
}
//update thông tin ngươi dung
export const fetchUpdateInforUser = (profile) => {
    return async (next) => {
        try {
            const res = await requestAPI({
                method: 'PUT',
                url: PATH_API.LINK_UPDATE_USER,
                data: profile
            })
           alert("Cập nhập thông tin thành công")
        } catch (error) {
            console.log(error)
        }
    }
}