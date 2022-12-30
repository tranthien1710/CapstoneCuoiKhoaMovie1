
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { fetchSignupAction } from '../redux/action'
import './Sign.css'
const Sign = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const formik = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: '',
            confirmmatKhau:'',
            email: "",
            soDt: "",
            maNhom: 'GP01',
            hoTen: ""
        },
        onSubmit: async(value) => {           
           try {
           await dispatch(fetchSignupAction(value))
            navigate("/")
           } catch (error) {
               alert(error.response.data.content)
           }
        },
        validationSchema: Yup.object({
            taiKhoan: Yup.string().required("You must fill in this section!"),
            matKhau: Yup.string().required("You must fill in this section!"),
            email: Yup.string().email("Invalid Email").required("You must fill in the section"),
            soDt: Yup.number("Invalid number").required("You must fill in the section"),
            hoTen: Yup.string().required("You must fill in the section"),
            confirmmatKhau:Yup.string().oneOf([Yup.ref("matKhau")],"Password dose not match!")
        })

    })

    return (
        <div className='flex justify-center' style={{ marginTop: "150px", width: "100%" }}>
            <div className="w-1/3" >
                <form onSubmit={formik.handleSubmit} action="action_page.php">
                    <div className="container">
                        <h1>Đăng kí</h1>
                        <p>Please fill in this form to create an account.</p>
                        <hr />
                        <label htmlFor="email"><b>Tài khoản</b></label>
                        <input type="text" placeholder="Enter Tài khoản" name="taiKhoan" onChange={formik.handleChange} id="email" required />
                        {formik.errors.taiKhoan && formik.touched.taiKhoan &&(
                            <p>{formik.errors.taiKhoan}</p>
                        )}
                        <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="matKhau" onChange={formik.handleChange} id="psw" required />
                        {formik.errors.matKhau && formik.touched.matKhau &&(
                            <p>{formik.errors.matKhau}</p>
                        )}
                        <label htmlFor="psw-repeat"><b>Repeat Password</b></label>
                        <input type="password" placeholder="Repeat Password" name="confirmmatKhau" onChange={formik.handleChange} required />
                        {formik.errors.confirmmatKhau && formik.touched.confirmmatKhau &&(
                            <p>{formik.errors.confirmmatKhau}</p>
                        )}
                        <label htmlFor="email"><b>Họ tên</b></label>
                        <input type="text" placeholder="Enter họ tên" name="hoTen" onChange={formik.handleChange}  required />
                        {formik.errors.hoTen && formik.touched.hoTen &&(
                            <p>{formik.errors.hoTen}</p>
                        )}
                        <label htmlFor="email"><b>Email</b></label>
                        <input type="text" placeholder="Enter Tài khoản" name="email" onChange={formik.handleChange} required />
                        {formik.errors.email && formik.touched.email &&(
                            <p>{formik.errors.email}</p>
                        )}
                        <label htmlFor="email"><b>Số điện thoại</b></label>
                        <input type="text" placeholder="Enter số điện thoại" name="soDt" onChange={formik.handleChange} required />
                        {formik.errors.soDt && formik.touched.soDt &&(
                            <p>{formik.errors.soDt}</p>
                        )}
                        <hr />
                        <p>By creating an account you agree to our <a href>Terms &amp; Privacy</a>.</p>
                        <button type='submit' className="registerbtn">Register</button>
                    </div>
                    <div className="container signin">
                        <p>Already have an account? <a href>Sign in</a>.</p>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Sign


