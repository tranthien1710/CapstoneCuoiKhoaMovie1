import { Button, Col, Modal, Row, Tabs, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useParams } from 'react-router-dom'
import { fetchDetailMovieAction, fetchScheduleMovie } from '../redux/action'


import { Rate } from 'antd';
import moment from 'moment'
const Detail = () => {

    const [isOpenModal, setOpenModal] = useState(false)

    const OpenModal = () => {
        setOpenModal(true)
    }
    const CloseModal = () => {
        var iframe = document.getElementById("control_iframe");
        if (iframe) {
            var iframesrc = iframe.src;
            iframe.src = iframesrc
        }

        setOpenModal(false)
    }

    const param = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        //lấy chi tiết phim qua pram
        dispatch(fetchDetailMovieAction(param.id))
        dispatch(fetchScheduleMovie(param.id))
    }, [])
    const detail = useSelector(state => state.booking.Detail)
    const schedule_movie = useSelector(state => state.booking.Schedule_movie)
    return (
        <div className='container mx-auto' style={{ marginTop: "150px" }}>

            <Row gutter={10}>
                <Col className='text-right' span={8}>
                    <img className='w-2/3' src={detail.hinhAnh}></img>
                </Col>
                <Col span={16}>
                    <table>
                        <tbody className='text-left'>
                            <tr>
                                <th style={{ width: "100px" }} >Tên Phim</th>
                                <td>{detail.tenPhim}</td>
                            </tr>
                            <tr>
                                <th>Mô tả</th>
                                <td>{detail.moTa}</td>
                            </tr>
                            <tr>
                                <th>Đánh giá</th>
                                <td><Rate count={10} value={detail.danhGia} /></td>
                            </tr>
                            <tr>
                                <th></th>
                                <td><Button onClick={OpenModal} type='primary' size='large'>Xem Trailer</Button> </td>
                            </tr>
                        </tbody>
                    </table>
                    <Tabs className='mt-10'
                        tabPosition={'left'}
                        items={schedule_movie.heThongRapChieu?.map((item,index)=>{
                            return   {
                                label: <img width={'60px'} alt='' src={item.logo} ></img>,
                                key: item.maHeThongRap,
                                children:item.cumRapChieu.map((item)=>{
                                    return <div >
                                        <p>{item.tenCumRap}</p>
                                        <p>{item.diaChi}</p>
                                        <div>
                                           { item.lichChieuPhim.map((item)=>{
                                               return <p ><Tag color="orange">{moment(item.ngayChieuGioChieu).format("DD/MM/YYYY hh:ss")}</Tag> <Link to={`/booking/${item.maLichChieu}`} ><Button type='primary' >Đặt vé</Button></Link> </p>
                                           })}
                                        </div>
                                    </div>
                                }),
                            }
                        })
                           
                        }
                    />
                </Col>
            </Row>
            <Modal width='700px' title="Xem Trailer" open={isOpenModal} onCancel={CloseModal}>
                <iframe id='control_iframe' height={'500px'} width="100%" src="https://www.youtube.com/embed/jLDTbZaW3oQ" frameborder="0"></iframe>
            </Modal>
        </div>
    )
}

export default Detail

