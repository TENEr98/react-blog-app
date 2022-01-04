import React from 'react'

import { Button, Form, Input, message } from 'antd'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { loginUser, onChangeSignIn } from '../../../store/authSlice'
import { LoadingComponent } from '../../Loading'

import './SignIn.scss'

const SignIn = () => {
  const dispatch = useDispatch()
  const navigation = useNavigate()
  const { signInForm, loading } = useSelector((state) => state.auth)

  const [antForm] = Form.useForm()

  const onChangeForm = (event) => {
    dispatch(onChangeSignIn(event))
  }

  const onSubmit = () => {
    dispatch(loginUser(signInForm))
      .unwrap()
      .then((response) => {
        if (response.status === 200) {
          message
            .success('You successfully signed in', 2)
            .then(() => navigation('/'))
        } else if (response.data) {
          message.error(`${Object.entries(response.data.errors).join(' ')}`, 3)
        }
      })
  }

  return (
    <div className="wrapper">
      <div className="sign-in__container">
        <div className="sign-in__content">
          {loading ? (
            <LoadingComponent />
          ) : (
            <>
              <h3 className="sign-in__title">Sign In</h3>
              <div className="sign-in__form">
                <Form layout="vertical" form={antForm} onFinish={onSubmit}>
                  <Form.Item
                    name="email"
                    label="Email address"
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
                      value={signInForm.email}
                      onChange={onChangeForm}
                      validatestatus="error"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!'
                      }
                    ]}
                  >
                    <Input.Password
                      name="password"
                      value={signInForm.password}
                      onChange={onChangeForm}
                      allowClear
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                      Login
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              <div className="redirect">
                <p>
                  Already have an account?{' '}
                  <NavLink to="/sign-up">Sign Up</NavLink>.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SignIn
