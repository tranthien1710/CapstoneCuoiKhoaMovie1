import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Table } from 'antd';
import { CalendarOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';
import { fetchDeleteFilmAction, fetchManagerFilmAction } from '../redux/action';

import { Input, Space } from 'antd';
const { Search } = Input;
const Film = () => {
  const dispatch = useDispatch()
  const listManagerFlim = useSelector(state => state.admin.adminFilm)
  const columns = [
    {
      title: 'Mã Phim',
      dataIndex: 'maPhim',
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ['descend'],
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'hinhAnh',
      render: ((text, listManagerFlim) => {
        return <img className='object-cover' height={"50px"} width={"50px"} alt='' src={listManagerFlim.hinhAnh} ></img>
      })

    },
    {
      title: 'Tên Phim',
      dataIndex: 'tenPhim',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.tenPhim - b.tenPhim,
    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',
      render: ((text, listManagerFlim) => {
        return <p>{listManagerFlim.moTa.slice(0, 100) + "..."}</p>
      })
    },
    {
      title: 'Action',
      dataIndex: 'tenPhim',
      render: ((text, listManagerFlim) => {
        return <div>
          <NavLink to={`/admin/editfilm/${listManagerFlim.maPhim}`} >   <span className='text-2xl ml-2 cursor-pointer'><EditOutlined /></span></NavLink>
          <span onClick={() => {
            if (window.confirm("Bạn có chăc` muốn xoá phim " + listManagerFlim.tenPhim)) {
              //dispatch aaction xoá phim

              try {
                dispatch(fetchDeleteFilmAction(listManagerFlim.maPhim))
                dispatch(fetchManagerFilmAction)
              } catch (error) {
                console.log(error)
              }
            }
          }} className='text-2xl ml-2 cursor-pointer'><DeleteOutlined /></span>
          <NavLink to={`/admin/showtime/${listManagerFlim.maPhim}/${listManagerFlim.tenPhim}`} onClick={() => {
            localStorage.setItem("phim", JSON.stringify(listManagerFlim))
          }}  ><span className='text-2xl ml-2 cursor-pointer'><CalendarOutlined /></span></NavLink>
        </div>
      })

    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  const onSearch = (value) => {
    dispatch(fetchManagerFilmAction(value))
  }
  return (
    <div>
      <Link to='/admin/addfilm' > <Button size='large' type='primary' className='mb-2'>Thêm Phim</Button></Link>
      <Search placeholder="input search text" onSearch={onSearch} enterButton />
      <Table columns={columns} dataSource={listManagerFlim} onChange={onChange} />;
    </div>
  )
}

export default Film
