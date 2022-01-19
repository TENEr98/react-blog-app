import React from 'react'
import { Button, Checkbox, Divider, Form, Input, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'

import { createUser, onChangeSignUp } from '../../../store/authSlice'
import { Loader } from '../../Loader'
import './SignUp.scss'

const SignUp = () => {
  const dispatch = useDispatch()
  const navigation = useNavigate()

  const { signUpForm, loading } = useSelector((state) => state.auth)

  const [antForm] = Form.useForm()

  const onChangeForm = (event) => {
    dispatch(onChangeSignUp(event))
  }

  const onSubmit = () => {
    const correctFormData = {
      username: signUpForm.username,
      email: signUpForm.email,
      password: signUpForm.password
    }

    dispatch(createUser(correctFormData))
      .unwrap()
      .then((response) => {
        if (response.status === 200) {
          message
            .success(
              'You successfully signed up, Please wait a bit to being proceed to sign in page',
              5
            )
            .then(() => navigation('/sign-in'))
        } else {
          message.error(
            `${Object.entries(response.data.errors)
              .join(' ')
              .replace(',', ' ')}`,
            3
          )
        }
      })
  }

  return (
    <div className="wrapper">
      <div className="sign-up__container">
        <div className="sign-up__content">
          {loading ? (
            <Loader />
          ) : (
            <>
              <h3 className="sign-up__title">Create new account</h3>
              <div className="sign-up__form">
                <Form
                  layout="vertical"
                  form={antForm}
                  onFinish={onSubmit}
                  scrollToFirstError={{
                    block: 'center'
                  }}
                >
                  <Form.Item
                    name="username"
                    label="Username"
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
                      value={signUpForm.username}
                      onChange={onChangeForm}
                      autoFocus
                    />
                  </Form.Item>
                  <Form.Item
                    name={['user', 'email']}
                    label="Email address"
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
                      value={signUpForm.email}
                      onChange={onChangeForm}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    validateStatus="validating"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Password!'
                      },
                      ({ getFieldValue }) => ({
                        validator() {
                          if (getFieldValue('password').length < 6) {
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
                      name="password"
                      value={signUpForm.password}
                      onChange={onChangeForm}
                      allowClear
                    />
                  </Form.Item>
                  <Form.Item
                    label="Repeat Password"
                    name="repeatPassword"
                    validateStatus="validating"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your Repeat Password!'
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve()
                          }
                          return Promise.reject(
                            new Error('Passwords must match')
                          )
                        }
                      })
                    ]}
                  >
                    <Input.Password allowClear />
                  </Form.Item>
                  <Divider />
                  <Form.Item name="agreement">
                    <Checkbox
                      name="agreement"
                      checked={signUpForm.agreement}
                      onChange={onChangeForm}
                    >
                      I agree to the processing of my personal information
                    </Checkbox>
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                      Create
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              <div className="redirect">
                <p>
                  Already have an account?{' '}
                  <NavLink to="/sign-in">Sign In</NavLink>.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default SignUp
