import React from 'react'
import Header_movie from '../component/Header_movie'
import Carousel_movie from '../component/Carousel_movie'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchListBannerAction, fetchListMovie, fetchScheduleCinemaAction } from '../redux/action'
import List_movie from '../component/List_movie'
import Schedule_movie from './Schedule_movie'

const Home = () => {

    const dispatch = useDispatch();
    //sử dụng useEffect dispath action khi renden
    useEffect(() => {
        //dispatch asyn lấy danh sách banner
        dispatch(fetchListBannerAction)
        //lấy danh sách phim
        dispatch(fetchListMovie())
        //lấy danh sách lich chiếu
        dispatch(fetchScheduleCinemaAction)
    }, [])

    return (
        <div>

            <Carousel_movie />
            <List_movie />
            <Schedule_movie />
        </div>
    )
}

export default Home
