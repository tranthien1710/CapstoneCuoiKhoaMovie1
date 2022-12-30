import React from 'react'
import { Row, Col, Card, Button, Pagination } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import './List_movie.css'
import { fetchListMovie } from '../redux/action'
import { actionType } from '../redux/type'
import clsx from 'clsx'
import { NavLink } from 'react-router-dom'

const List_movie = () => {
    const dispatch = useDispatch()
    //lấy danh sách movie
    const list_movie = useSelector(state => state.booking.Movie_list)
    const dangchieu =useSelector(state=>state.booking.DangChieu)
    const sapchieu=useSelector(state=>state.booking.SapChieu)
 
   
  
   
    return (
        <div className="container mx-auto mt-20">
            <div className='mb-2'>
                <Button  className={clsx({"bg-red-900":dangchieu})}
                    onClick={() => {
                        //gủi action lên redux lọc danh sách đang chiếu
                        const action = { type: actionType.SHOW_DANGCHIEU }
                        dispatch(action);
                    }}
                  
                    size='large' type='primary'>Đang Chiếu</Button>
                <Button className={clsx({"bg-red-900":sapchieu})}
                onClick={()=>{
                    //gủi action lên redux lọc danh sách sap chieu
                    dispatch({
                        type:actionType.SHOW_SAPCHIEU,
                    })
                }} style={{marginLeft:'10px'}}  size='large' type='primary'>Sắp Chiếu</Button>
            </div>
            <Row gutter={[10, 10]}>
                {list_movie.items?.map((item, index) => {
                    return (
                        <Col key={index} xs={24} sm={16} md={12} lg={8} xl={6}>
                            <Card
                                className='group_card'
                                hoverable
                                style={{
                                    width: "100%",
                                }}
                                cover={<img className='object-cover' height="500px" alt="example" src={item.hinhAnh} />}
                            >
                                <div className='anime_anime transition  ease-in duration-300'></div>
                                <h2>{item.tenPhim}</h2>
                              <NavLink to={`/detail/${item.maPhim}`} >  <div className='w-full'>  <Button style={{ width: "100%" }} type='primary'>Đặt vé</Button></div></NavLink>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
            <Pagination
                onChange={(page) => {
                    //dispatch asyn action lấy danh sách theo page
                    dispatch(fetchListMovie(page))
                }} defaultCurrent={list_movie.currentPage} pageSize={+list_movie.count} total={list_movie.totalCount} />
        </div>
    )
}

export default List_movie
