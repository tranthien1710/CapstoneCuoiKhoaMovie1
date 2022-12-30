import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchDeleteUserAction, fetchListUserAction } from '../redux/action'
import { Button, Table } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import { Link } from 'react-router-dom';
const { Search } = Input;
const ManagerUser = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchListUserAction())
    }, [])
    const list_users = useSelector(state => state.admin.list_users)
    const columns = [
        {
            title: 'STT',
            dataIndex: 'hoTen',
            render: (text, list_users, index) => {
                return <p>{index}</p>
            }
        },
        {
            title: 'Tài khoản',
            dataIndex: 'taiKhoan',
            filters: [
            ],
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.taiKhoan - b.taiKhoan,
            sortDirections: ['descend'],
        },
        {
            title: 'Họ tên',
            dataIndex: 'hoTen',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.hoTen - b.hoTen,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.email - b.email,
        },
        {
            title: 'Số Điện thoại',
            dataIndex: 'soDT',
            onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
        {
            title: 'Mật Khẩu',
            dataIndex: 'matKhau',
            onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
        {
            title: 'Action',
            dataIndex: 'matKhau',
            render: (text, list_users) => {
                return <div>
                  <Link to={`/admin/edituser/${list_users.taiKhoan}`} > <span className='text-2xl mx-2 cursor-pointer'><EditOutlined /></span></Link> 
                    <span
                        onClick={() => {
                            if (window.confirm("bạn chắc muôn xoá " + list_users.taiKhoan)) {
                                dispatch(fetchDeleteUserAction(list_users.taiKhoan))
                            }
                        }} className='text-2xl mx-2 cursor-pointer'><DeleteOutlined /></span>
                </div>
            }
        },
    ];
    const data = list_users;
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    const onSearch = (value) => {
        dispatch(fetchListUserAction(value))
    }
    return (
        <div>
            <h1>Danh sách người dùng</h1>
            <Search className='my-2' placeholder="input search text" onSearch={onSearch} enterButton />
            <Link to="/admin/adduser" >  <Button type='primary' size='large'>Thêm người dùng</Button></Link>
            <Table columns={columns} dataSource={data} onChange={onChange} />;
        </div>
    )
}

export default ManagerUser
