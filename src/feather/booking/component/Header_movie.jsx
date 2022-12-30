import React, { useEffect, useState } from 'react'
import { Button } from 'antd'
import { NavLink, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { UserOutlined } from '@ant-design/icons'
import './Header_movie.css'
const Header_movie = () => {
    const [isScroll, setScroll] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScroll(true)
            } else {
                setScroll(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
    }, [])

    const profile = useSelector(state => state.user.profile)
    return (
        <header className={isScroll && 'bg-[#141414]'}>
            <div className="container flex justify-between h-16 mx-auto">
                <Link to="/" aria-label="Back to homepage" className="flex items-center p-2">
                    <img style={{ width: "200px" }} src="https://demo1.cybersoft.edu.vn/logo.png"></img>
                </Link>
                <ul className="group_navBar hidden space-x-3 md:flex list-none font-light  ">
                    <li >
                        <a href="#" className="flex items-center text-white px-4 -mb-1 border-b-2 dark:border-transparent  no-underline hover:text-black">Lịch chiếu</a>
                    </li>
                    <li >
                        <a href="#" className="flex items-center text-white px-4 -mb-1 border-b-2 dark:border-transparent  no-underline hover:text-black">Cụm rạp</a>
                    </li>
                    <li >
                        <a href="#" className="flex items-center text-white px-4 -mb-1 border-b-2 dark:border-transparent  no-underline hover:text-black">Tin tức</a>
                    </li>
                    <li >
                        <a href="#" className="flex items-center text-white px-4 -mb-1 border-b-2 dark:border-transparent  no-underline hover:text-black">ỨNg dụng</a>
                    </li>
                </ul>
                {profile ? <p className="text-white items-center flex-shrink-0 hidden md:flex">Xin chào {profile.hoTen} <Link to="/user" ><span className='mx-2 text-2xl cursor-pointer text-white'><UserOutlined /></span></Link>{profile.maLoaiNguoiDung === "QuanTri" ? <Link to="/admin"><Button type='primary' size='small' className='space-x-2'>Quản lý</Button></Link> : null} </p> : (<div className="items-center flex-shrink-0 hidden md:flex">
                    <NavLink to="/login">  <Button className="bg-blue-900  text-white"  >Đăng nhập</Button></NavLink>
                    <NavLink to="/sign" > <Button className="bg-blue-900  text-white"  >Đăng kí</Button></NavLink>
                </div>)}

                <div id='icon' className=' text-3xl mt-5 mr-5 hidden '>
                    <i class="fa-solid fa-bars"></i>
                </div>
            </div>
        </header>

    )
}

export default Header_movie
