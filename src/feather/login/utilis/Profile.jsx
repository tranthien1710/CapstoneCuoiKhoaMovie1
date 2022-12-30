import { Button, Checkbox, Form, Input, Row, Col } from 'antd';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfileAction, fetchUpdateInforUser } from '../redux/action';

const Profile = () => {
  const dispatch = useDispatch();
 
  const profile = useSelector(state => state.user.profile)
 
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: profile?.taiKhoan,
      matKhau: profile?.matKhau,
      email: profile?.email,
      soDt: profile?.soDT,
      maNhom: profile?.maNhom ,
      maLoaiNguoiDung: profile?.maLoaiNguoiDung,
      hoTen: profile?.hoTen
    },
    onSubmit: (values) => {
      dispatch(fetchUpdateInforUser(values))
    }
  })
  return (
    <div>
      <h1>Thông tin tài khoản</h1>
      <Form
        onSubmitCapture={formik.handleSubmit}

        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
      >
        <Row>
          <Col span={12}>
            <Form.Item
              label="Họ tên"


              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input name="hoTen" onChange={formik.handleChange} value={formik.values.hoTen} />
            </Form.Item>
            <Form.Item
              label="Email"

              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input name="email" onChange={formik.handleChange} value={formik.values.email} />
            </Form.Item>
            <Form.Item
              label="Số Điện thoại"

              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input name="soDt" onChange={formik.handleChange} value={formik.values.soDt} />
            </Form.Item>

          </Col>
          <Col span={12}>
            <Form.Item
              label="Tài khoản"

              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
            >
              <Input name="taiKhoan" onChange={formik.handleChange} value={formik.values.taiKhoan} />
            </Form.Item>
            <Form.Item
              label="Mật Khẩu"

              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password name="matKhau" onChange={formik.handleChange} value={formik.values.matKhau} />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Cập nhập
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default Profile
