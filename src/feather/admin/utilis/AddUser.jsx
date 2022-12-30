import React, { useEffect, useState } from 'react'
import { Button, Select, Col, Form, Input, Row } from 'antd';
import { GetListTypeUser } from './AddUserService';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import { fetchAddUserAction } from '../redux/action';

const AddUser = () => {
    const [typeUser, settypeUser] = useState([])
    const dispatch=useDispatch()
    useEffect(() => {
        return async () => {
            await GetListTypeUser().then(res => settypeUser(res.data.content))
        }
    }, [])
    console.log(typeUser)
    const formik = useFormik({
        initialValues: {
            "taiKhoan": "",
            "matKhau": "",
            "email": "",
            "soDt": "",
            "maNhom": "GP01",
            "maLoaiNguoiDung": "",
            "hoTen": ""
        },
        onSubmit: (value) => {
            dispatch(fetchAddUserAction(value))
        },
        validationSchema: Yup.object({
            taiKhoan: Yup.string().required("Please input"),
            matKhau: Yup.string().required("Please input"),
            email: Yup.string().required("Please input").email("email invalid"),
            soDt: Yup.number("input number").required("Please input"),
            hoTen: Yup.string().required("Please input")
        })
    })
    const handleChangeType = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }
    const handleChangeNUmber = (value) => {
        console.log(value)
    }
    return (
        <div>
            <Form
                onSubmitCapture={formik.handleSubmit}
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}

            >
                <Row>
                    <Col span={12}>
                        <Form.Item
                            label="Tài khoản"

                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your username!',
                                },
                            ]}
                        >
                            <Input name="taiKhoan" onChange={formik.handleChange} />
                            {formik.errors.taiKhoan && formik.touched.taiKhoan && (
                                <p>{formik.errors.taiKhoan}</p>
                            )}
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"

                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password name='matKhau' onChange={formik.handleChange} />
                            {formik.errors.taiKhoan && formik.touched.taiKhoan && (
                                <p>{formik.errors.taiKhoan}</p>
                            )}
                        </Form.Item>
                        <Form.Item
                            label="Họ tên"

                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your last name!',
                                },
                            ]}
                        >
                            <Input name='hoTen' onChange={formik.handleChange} />
                            {formik.errors.hoTen && formik.touched.hoTen && (
                                <p>{formik.errors.hoTen}</p>
                            )}
                        </Form.Item>

                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Email"

                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Email!',
                                },


                            ]}
                        >
                            <Input name='email' onChange={formik.handleChange} />
                            {formik.errors.email && formik.touched.email && (
                                <p>{formik.errors.email}</p>
                            )}
                        </Form.Item>

                        <Form.Item
                            label="Số Dt"

                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your number phone!',
                                },

                            ]}
                        >
                            <Input name='soDt' onChange={formik.handleChange} />
                            {formik.errors.soDt && formik.touched.soDt && (
                                <p>{formik.errors.soDt}</p>
                            )}
                        </Form.Item>
                        <Form.Item label="Loại người dùng" >
                            <Select
                                name="maLoaiNguoiDung"
                                onChange={handleChangeType("maLoaiNguoiDung")}
                                style={{
                                    width: "100%",
                                }}
                                options={typeUser?.map(item => ({ label: item.tenLoai, value: item.maLoaiNguoiDung }))}
                            />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >

                            <Button type="primary" htmlType="submit">
                                Thêm
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default AddUser
