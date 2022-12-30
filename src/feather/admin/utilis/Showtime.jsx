import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
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
import { getInforCumRapTheoHeThong, getInfoSystemMovie } from './ServiceShowtime';
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchAddScheduleACtion } from '../redux/action';
const Showtime = () => {
    const dispatch = useDispatch()
    const [state, setState] = useState({
        heThongRap: [],
        cumRap: []
    })
    useEffect(() => {
        return async () => {
            await getInfoSystemMovie().then(res => {
                setState({
                    ...state, heThongRap: res.data.content
                })
            })
        }
    }, [])



    const optionHandle = () => {
        return state.heThongRap?.map((item) => {
            return { label: item.tenHeThongRap, value: item.maHeThongRap }
        })
    }
    const handleChangeSystemCinema = async (value) => {
        try {
            const res = await getInforCumRapTheoHeThong(value)
            setState({
                ...state, cumRap: res.data.content
            })

        } catch (error) {
            console.log(error)
        }
    }
    const param = useParams()

    const formik = useFormik({
        initialValues: {
            maPhim: param.id,
            ngayChieuGioChieu: "",
            maRap: '',
            giaVe: ""
        },
        onSubmit: (values) => {
            console.log(values)
            dispatch(fetchAddScheduleACtion(values))
        }
    })
    const onchangeDatePicker = (date, dateString) => {
        formik.setFieldValue("ngayChieuGioChieu", dateString)
    }
    const handleChangeINput = (name) => {
        return (values) => {
            formik.setFieldValue(name, values)
        }
    }
    const handleChangeSelect = (name) => {
        return (value) => {
            formik.setFieldValue(name, value)
        }
    }

    let film = {};
    if (localStorage.getItem("phim")) {
        film = JSON.parse(localStorage.getItem("phim"))
    }

    return (

        <div>
             <h1> Tạo lịch chiếu-{param.tenphim}</h1>
            <Row>
                <Col span={8}>                  
                    <img alt='' width={"300px"} height="400px" src={film.hinhAnh} ></img>
                </Col>
                <Col span={16}>
                    <Form
                        onSubmitCapture={formik.handleSubmit}
                        labelCol={{
                            span: 4,
                        }}
                        wrapperCol={{
                            span: 14,
                        }}

                    >
                        <Form.Item label="Hệ thống rạp">

                            <Select options={optionHandle()} onChange={handleChangeSystemCinema} placeholder="Chọn hệ thống rạp" ></Select>

                        </Form.Item>
                        <Form.Item label="Cụm rạp">

                            <Select value={state.cumRap[0]?.tenCumRap} options={state.cumRap.map(item => {
                                return { label: item.tenCumRap, value: item.maCumRap }
                            })} placeholder="Chọ cụm rạp" name='maRap' onChange={handleChangeSelect("maRap")} ></Select>

                        </Form.Item>

                        <Form.Item label="Ngày chiếu giờ chiếu">
                            <DatePicker format="DD/MM/YYYY hh:mm:ss" onChange={onchangeDatePicker} />
                        </Form.Item>
                        <Form.Item label="Giá vé">
                            <InputNumber name='giaVe' onChange={handleChangeINput("giaVe")} />
                        </Form.Item>

                        <Form.Item label="Chức năng">
                            <Button type='primary' htmlType='submit'>Tạo lịch chiếu</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}

export default Showtime
