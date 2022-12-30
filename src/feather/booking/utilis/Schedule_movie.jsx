import { Col, Row, Tabs, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { getInfoScheduleCinema } from './serviceSchedule'

const Schedule_movie = () => {
    const dispatch = useDispatch()
    const ListScheduleCinema = useSelector(state => state.booking.List_Schedule_Cinema)
    const [listTabs, setListTabs] = useState([])
    useEffect(() => {
        getInfoScheduleCinema(ListScheduleCinema[0]?.maHeThongRap).then(res => setListTabs(res.data.content))
    }, [ListScheduleCinema])

   
    return (
        <div className='container mx-auto mt-10 hidden md:block'>
            <Tabs
                onChange={(key) => {
                    getInfoScheduleCinema(key).then(res => setListTabs(res.data.content))
                }}
                tabPosition={'left'}
                items={ListScheduleCinema.map((item) => {
                    return {

                        label: <img width={"70px"} alt='' src={item.logo} ></img>,
                        key: item.maHeThongRap,
                        children: <Tabs
                            tabPosition={'left'}
                            items={listTabs && listTabs.length > 0 && listTabs[0].lstCumRap?.map(item => {
                                return {
                                    label: <div><p>{item.tenCumRap}</p> <p> {item.diaChi}</p> </div>,
                                    key: item.maCumRap,
                                    children: item.danhSachPhim.slice(0, 6).map((item) => {
                                        return <div className='mb-5 flex '>
                                            <img width={"100px"} height="100px" alt='' src={item.hinhAnh}></img>
                                            <div className='ml-2'> <p className='mt-0 font-bold'>{item.tenPhim}</p>
                                               <Row>
                                               {item.lstLichChieuTheoPhim.slice(0, 4).map((item) => {
                                                    return <Col span={12}><Tag color={"blue"}>{moment(item.ngayChieuGioChieu).format("DD/MM/YYYY hh:mm")}</Tag></Col>
                                                })}
                                               </Row>
                                            </div>
                                        </div>
                                    }),
                                }
                            })}

                        />

                    }
                })}

            />
        </div>
    )
}

export default Schedule_movie;

// listTabs && listTabs.length > 0 && listTabs[0].lstCumRap?.map((item) => {
//     return <p>{item.tenCumRap} {item.diaChi}</p>
// }),
