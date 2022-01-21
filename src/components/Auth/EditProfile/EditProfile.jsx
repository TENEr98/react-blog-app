import { useEffect } from 'react'
import { Button, Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import {
  getProfile,
  onChangeEditProfile,
  updateProfile
} from '../../../store/authSlice'
import './EditProfile.scss'

const EditProfile = () => {
  const [antForm] = Form.useForm()
  const dispatch = useDispatch()
  const { username, isAuth, editProfileForm } = useSelector(
    (state) => state.auth
  )

  useEffect(() => {
    ;(async () => {
      const response = await dispatch(getProfile()).unwrap()
      antForm.setFieldsValue({
        username: response.data.user.username,
        email: response.data.user.email,
        avatarImg: response.data.user.image
      })
    })()
  }, [])

  const onChangeForm = (event) => {
    dispatch(onChangeEditProfile(event))
  }

  const onSubmit = () => {
    const correctData = {
      email: editProfileForm.email,
      image: editProfileForm.avatarImg,
      password: editProfileForm.newPassword,
      username: editProfileForm.username
    }
    dispatch(updateProfile(correctData)).unwrap()
  }
  if (username.length <= 0 && !isAuth) return <Navigate to="/sign-in" />

  return (
    <div className="wrapper">
      <div className="profile">
        <div className="profile__container">
          <div className="profile__content">
            <h3 className="profile__title">Edit Profile</h3>
            <Form
              layout="vertical"
              form={antForm}
              onFinish={onSubmit}
              initialValues={editProfileForm}
            >
              <Form.Item
                label="Username"
                name="username"
                validateStatus="validating"
                rules={[
                  {
                    required: true,
                    message: 'Please input your Username!'
                  }
                ]}
              >
                <Input
                  name="username"
                  value={editProfileForm.username}
                  placeholder={editProfileForm.username}
                  onChange={onChangeForm}
                />
              </Form.Item>
              <Form.Item
                label="Email address"
                name="email"
                validateStatus="validating"
                rules={[
                  {
                    required: true,
                    message: 'Please input your E-mail!'
                  },
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!'
                  }
                ]}
              >
                <Input
                  name="email"
                  value={editProfileForm.email}
                  placeholder={editProfileForm.email}
                  onChange={onChangeForm}
                />
              </Form.Item>
              <Form.Item
                label="New password"
                name="New password"
                validateStatus="validating"
                rules={[
                  {
                    required: true,
                    message: 'Please input your New password!'
                  },
                  ({ getFieldValue }) => ({
                    validator() {
                      if (
                        !getFieldValue('New password') ||
                        getFieldValue('New password').length < 6
                      ) {
                        return Promise.reject(
                          'Your password needs to be at least 6 characters.'
                        )
                      }
                      return Promise.resolve()
                    }
                  })
                ]}
              >
                <Input.Password
                  name="newPassword"
                  value={editProfileForm.newPassword}
                  onChange={onChangeForm}
                  allowClear
                />
              </Form.Item>
              <Form.Item
                label="Avatar image(url)"
                name="avatarImg"
                validateStatus="validating"
              >
                <Input
                  name="avatarImg"
                  value={editProfileForm.avatarImg}
                  placeholder={editProfileForm.avatarImg}
                  onChange={onChangeForm}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Save
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
