import { Button, Col, Row } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchListRoomTicket, fetchListTicked } from '../redux/action';

import './Booking.css';
import Chair from './Chair';
const Booking = () => {
    const param = useParams()
    const dispatch = useDispatch()
    //lấy danh sách phòng vé
    const list_room_ticket = useSelector(state => state.booking.List_room_ticket)
    //lấy dnash sách ghế đang chọn 
    const list_booking = useSelector(state => state.booking.List_room_ticket_booking)
   
    //list gửi len back end
    const listselected = {
        maLichChieu: param.id,
        danhSachVe: list_booking
    }
  
    useEffect(() => {
        dispatch(fetchListRoomTicket(param.id))
    }, [])

    return (
        <div >
            <div className='container mx-auto' style={{ marginTop: '150px' }}>
                <Row>
                    <Col className='text-center' span={18}>
                        <div className='flex justify-center'>
                            <div className='trapezoid'>
                            </div>
                        </div>
                        <div className='mt-10'>
                            {list_room_ticket.danhSachGhe?.slice(0, 99).map((item,index) => {
                                return <Chair key={index} chair={item} />
                            })}
                        </div>
                    </Col>
                    <Col span={6}>
                        <div className='flex justify-between my-5'><span className='font-bold'>Ngày Chiếu Giờ Chiếu</span> <span>{list_room_ticket.thongTinPhim?.ngayChieu}</span> </div>
                        <div className='flex justify-between my-5'><span className='font-bold'>Giờ chiếu</span> <span>{list_room_ticket.thongTinPhim?.gioChieu}</span> </div>
                        <div className='flex justify-between my-5'><span className='font-bold'>Cụm Rạp</span> <span>{list_room_ticket.thongTinPhim?.tenCumRap}</span> </div>
                        <div className='flex justify-between my-5'><span className='font-bold'> Rạp</span> <span>{list_room_ticket.thongTinPhim?.tenRap}</span> </div>
                        <table cellPadding={10} width={"100%"}>
                            <thead>
                                <tr>
                                    <th className='text-left'>Ghế Chọn</th>
                                    <th className='text-right'>Thành tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list_booking?.map((item) => {
                                    return <tr key={item.maGhe}>
                                        <td className='text-left'>{item.tenGhe}</td>
                                        <td className='text-right'> {item.giaVe.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</td>
                                    </tr>
                                })}

                            </tbody>
                            <tfoot>
                                <tr>
                                    <th className='text-left'>Tổng tiền</th>
                                    <th className='text-right'>{list_booking.reduce((total, item) => {
                                        return total + item.giaVe
                                    }, 0).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</th>
                                </tr>
                                <tr>
                                    <td><Button
                                        onClick={() => {
                                            //gửi action để thực hiện thanh toán
                                          
                                            dispatch(fetchListTicked(listselected))
                                            dispatch(fetchListRoomTicket(param.id))
                                        }} type='primary'>Thanh Toán</Button> </td>
                                </tr>
                            </tfoot>
                        </table>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Booking
