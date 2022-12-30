
import React from 'react'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { fetchLoginAction } from '../redux/action'
import './Login.css'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const disipatch = useDispatch()
    const navigate=useNavigate()
    const formik = useFormik({
        initialValues: {
            taiKhoan: "",
            matKhau: ""
        },

        onSubmit: async(value) => {
           try {
           await disipatch(fetchLoginAction(value))
            navigate("/")
           } catch (error) {
               console.log(error)
           }
        },
        validationSchema: yup.object({
            taiKhoan: yup.string().required("Required"),
            matKhau: yup.string().required("Required")
        })

    })


    return (
        <div style={{ marginTop: "150px" }}>
            <div className="px-6 h-full text-gray-800">
                <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                    <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="w-full" alt="Sample image" />
                    </div>
                    <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                        <form onSubmit={formik.handleSubmit} >
                            <div className="flex flex-row items-center justify-center lg:justify-start">
                                <h2 className="text-3xl text-center w-full">Login</h2>

                            </div>

                            {/* Email input */}
                            <div className="mb-6">
                                <input type="text" name='taiKhoan' onChange={formik.handleChange} className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Account" />
                                {formik.errors.taiKhoan && formik.touched.taiKhoan && (
                                    <p>{formik.errors.taiKhoan}</p>
                                )}
                            </div>
                            {/* Password input */}
                            <div className="mb-6">
                                <input type="password" name='matKhau' onChange={formik.handleChange} className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Password" />
                                {formik.errors.matKhau && formik.touched.matKhau && (
                                    <p>{formik.errors.matKhau}</p>
                                )}
                            </div>
                            <div className="flex justify-between items-center mb-6">

                                <a href="#!" className="text-gray-800">Forgot password?</a>
                            </div>
                            <div className="text-center lg:text-left">
                                <button type="submit" className="border-inherit w-full inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                                    Login
                                </button>
                                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                                    Don't have an account?
                                    <a href="#!" className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">Register</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>



    )
}

export default Login



