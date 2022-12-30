import React, { useState } from 'react'
import moment from 'moment'
import * as Yup from 'yup'
import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
} from 'antd';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { fetchAddFilmAction } from '../redux/action';
const Addfilm = () => {
    const [imgSrc, setimgSrc] = useState('')
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            tenPhim: "",
            trailer: "",
            moTa: "",
            maNhom: "",
            ngayKhoiChieu: "",
            SapChieu: "",
            DangChieu: "",
            Hot: "",
            danhGia: "",
            hinhAnh: {}
        },
        onSubmit: (values) => {
            console.log(values)
            let fordata = new FormData();
            for (let key in values) {
                if (key !== "hinhAnh") {
                    fordata.append(key, values[key])
                } else {
                    fordata.append('Flie', values.hinhAnh, values.hinhAnh.name)
                }
            }
            // dispatch action them phim
            dispatch(fetchAddFilmAction(fordata))
        },
        validationSchema: Yup.object({
            tenPhim: Yup.string().required("File is required"),
            trailer: Yup.string().required("File is required"),
            moTa: Yup.string().required("File is required"),
            ngayKhoiChieu: Yup.string().required("File is required"),
            danhGia: Yup.string().required("File is required")
        })


    })
    const handlechangeSwitch = (name) => {
        return (values) => {
            formik.setFieldValue(name, values)
        }
    }
    const handleChangeNumber = (name) => {
        return (values) => {
            formik.setFieldValue(name, values)
        }
    }
    // const handleChangeDate = (name) => {

    //     return (values) => {
    //         // console.log("ngày",moment(values).format("DD/MM/YYYY"))
    //         formik.setFieldValue(name, moment(values).format("DD/MM/YYYY"))
    //     }
    // }
    const onChangedate = (date, dateString) => {
        // console.log("date", date);
        // console.log("dateString", dateString);
        formik.setFieldValue("ngayKhoiChieu", dateString)
    };

    const handleChangefile = (e) => {

        let read = new FileReader();
        read.readAsDataURL(e.target.files[0])
        read.onload = (e) => {
            setimgSrc(e.target.result)
        }
        formik.setFieldValue("hinhAnh", e.target.files[0])
    }
    return (
        <Form
            onSubmitCapture={formik.handleSubmit}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 14,
            }}

        >
            <Form.Item label="Tên Phim">
                <Input name='tenPhim' onChange={formik.handleChange} />
                {formik.errors.tenPhim && formik.touched.tenPhim && (
                    <p>{formik.errors.tenPhim}</p>
                )}
            </Form.Item>
            <Form.Item label="Mô tả">
                <Input name='moTa' onChange={formik.handleChange} />
                {formik.errors.moTa && formik.touched.moTa && (
                    <p>{formik.errors.moTa}</p>
                )}
            </Form.Item>
            <Form.Item label="Trailer">
                <Input name='trailer' onChange={formik.handleChange} />
                {formik.errors.trailer && formik.touched.trailer && (
                    <p>{formik.errors.trailer}</p>
                )}
            </Form.Item>
            <Form.Item label="DatePicker">
                <DatePicker name='ngayKhoiChieu' format={"DD/MM/YYYY"} onChange={onChangedate} />
                {formik.errors.ngayKhoiChieu && formik.touched.ngayKhoiChieu && (
                    <p>{formik.errors.ngayKhoiChieu}</p>
                )}
            </Form.Item>
            <Form.Item label="Số sao">
                <InputNumber name='danhGia' onChange={handleChangeNumber("danhGia")} />
                {formik.errors.danhGia && formik.touched.danhGia && (
                    <p>{formik.errors.danhGia}</p>
                )}
            </Form.Item>
            <Form.Item label="Đang Chiếu" valuePropName="checked">
                <Switch name="DangChieu" onChange={handlechangeSwitch("DangChieu")} />
            </Form.Item>
            <Form.Item label="Sắp Chiếu" valuePropName="checked">
                <Switch name="SapChieu" onChange={handlechangeSwitch("SapChieu")} />
            </Form.Item>
            <Form.Item label="Hót" valuePropName="checked">
                <Switch name="Hot" onChange={handlechangeSwitch("Hot")} />
            </Form.Item>
            <Form.Item label="Hình ảnh">
                <Input type='file' onChange={handleChangefile} />
                <img style={{ width: "150px", height: "150px" }} alt="" src={imgSrc} ></img>
            </Form.Item>
            <Form.Item label="Tác vụ">
                <Button htmlType="submit" type='primary'>Thêm</Button>
            </Form.Item>
        </Form>
    )
}

export default Addfilm
