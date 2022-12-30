import { Col, Row } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'

const HistoryBooking = () => {
  const profile = useSelector(state => state.user.profile)
  console.log(profile)
  return (
    <div className='container mx-auto'>
      <h1>Lịch sử đặt vé</h1>
      <Row>
        {profile?.thongTinDatVe?.slice(0, 4).map((item) => {
          return <Col key={item.maVe} span={6}>
            <div className='flex flex-nowrap'>
              <div>
                <img width={"100px"} height="100px" alt='' src={item.hinhAnh}></img>
              </div>
              <div className='ml-2'>
                <h3 className='text-sm mt-0'>{item.tenPhim}</h3>
                <p>Ngày đặt:{moment(item.ngayDat).format("DD/MM/YYYY hh:mm")}</p>
                <div>
                  {item.danhSachGhe?.slice(0,3).map(item=>{
                    return <p key={item.maGhe}>{item.tenHeThongRap}-{item.tenCumRap}-{item.tenGhe}</p>
                  })}
                </div>
              </div>
            </div>
          </Col>
        })}
      </Row>
    </div>
  )
}

export default HistoryBooking
