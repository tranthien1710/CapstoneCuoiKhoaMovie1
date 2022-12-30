import React, { useEffect, useState } from 'react'
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
import { useDispatch, useSelector } from 'react-redux';
import { fetchUPdateFilmAction } from '../redux/action';
import { useParams } from 'react-router-dom';
import { fetchDetailMovieAction } from 'feather/booking/redux/action';
const EditFilm = () => {
    const [imgSrc, setimgSrc] = useState('')
    const dispatch = useDispatch()
    const param = useParams()
    useEffect(() => {
        dispatch(fetchDetailMovieAction(param.id))
    }, [])
    const FilmDetail = useSelector(state => state.booking.Detail)
  

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            maPhim: FilmDetail.maPhim,
            tenPhim: FilmDetail.tenPhim,
            trailer: FilmDetail.trailer,
            moTa: FilmDetail.moTa,
            maNhom: FilmDetail.maNhom,
            ngayKhoiChieu: FilmDetail.ngayKhoiChieu,
            SapChieu: FilmDetail.sapChieu,
            DangChieu: FilmDetail.dangChieu,
            Hot: FilmDetail.hot,
            danhGia: FilmDetail.danhGia,
            hinhAnh: null
        },
        onSubmit: (values) => {
            console.log(values)
            let fordata = new FormData();
            for (let key in values) {
                if (key !== "hinhAnh") {
                    fordata.append(key, values[key])
                } if (values.hinhAnh != null) {
                    fordata.append('Flie', values.hinhAnh, values.hinhAnh.name)
                }
            }
            // dispatch action them phim
            dispatch(fetchUPdateFilmAction(fordata))
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
                <Input name='tenPhim' onChange={formik.handleChange} value={formik.values.tenPhim} />
                {formik.errors.tenPhim && formik.touched.tenPhim && (
                    <p>{formik.errors.tenPhim}</p>
                )}
            </Form.Item>
            <Form.Item label="Mô tả">
                <Input name='moTa' onChange={formik.handleChange} value={formik.values.moTa} />
                {formik.errors.moTa && formik.touched.moTa && (
                    <p>{formik.errors.moTa}</p>
                )}
            </Form.Item>
            <Form.Item label="Trailer">
                <Input name='trailer' onChange={formik.handleChange} value={formik.values.trailer} />
                {formik.errors.trailer && formik.touched.trailer && (
                    <p>{formik.errors.trailer}</p>
                )}
            </Form.Item>
            <Form.Item label="DatePicker">
                <DatePicker name='ngayKhoiChieu' format={"DD/MM/YYYY"} onChange={onChangedate} defaultValue={moment(formik.values.ngayKhoiChieu)} />
                {formik.errors.ngayKhoiChieu && formik.touched.ngayKhoiChieu && (
                    <p>{formik.errors.ngayKhoiChieu}</p>
                )}
            </Form.Item>
            <Form.Item label="Số sao">
                <InputNumber name='danhGia' onChange={handleChangeNumber("danhGia")} value={formik.values.danhGia} />
                {formik.errors.danhGia && formik.touched.danhGia && (
                    <p>{formik.errors.danhGia}</p>
                )}
            </Form.Item>
            <Form.Item label="Đang Chiếu" valuePropName="checked">
                <Switch name="DangChieu" onChange={handlechangeSwitch("DangChieu")} checked={formik.values.DangChieu} />
            </Form.Item>
            <Form.Item label="Sắp Chiếu" valuePropName="checked">
                <Switch name="SapChieu" onChange={handlechangeSwitch("SapChieu")} checked={formik.values.SapChieu} />
            </Form.Item>
            <Form.Item label="Hót" valuePropName="checked">
                <Switch name="Hot" onChange={handlechangeSwitch("Hot")} checked={formik.values.Hot} />
            </Form.Item>
            <Form.Item label="Hình ảnh">
                <Input type='file' onChange={handleChangefile} />
                <img style={{ width: "150px", height: "150px" }} alt="" src={imgSrc === "" ? FilmDetail.hinhAnh : imgSrc} ></img>
            </Form.Item>
            <Form.Item label="Tác vụ">
                <Button htmlType="submit" type='primary'>Cập nhập</Button>
            </Form.Item>
        </Form>
    )
}

export default EditFilm
