import React from 'react'
import { Carousel } from 'antd';
import { useSelector } from 'react-redux';
const Carousel_movie = () => {
    //láy danh sách banner trên store về
    const list_Banner = useSelector(state => state.booking.Banner_movie)
    return (
        <Carousel >
            {list_Banner.map((item, index) => {
                return (
                    <div key={index}>
                        <img className="w-full h-99 object-cover" alt="" src={item.hinhAnh} ></img>
                    </div>
                )
            })}

        </Carousel>
    )
}

export default Carousel_movie
