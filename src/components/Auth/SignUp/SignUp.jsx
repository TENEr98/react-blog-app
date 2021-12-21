import React, { useState } from 'react'

import { Button, Checkbox, Divider, Form, Input, message } from 'antd'
import { NavLink } from 'react-router-dom'

import { AuthAPI } from '../../../api'

import './SignUp.scss'

const DEFAULT_FORM = {
  username: '',
  email: '',
  password: '',
  agreement: false
}

const SignUp = () => {
  const [form, setForm] = useState(DEFAULT_FORM)

  const [antForm] = Form.useForm()

  const onChangeForm = ({ target: { value, name, checked } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: name.includes('agreement') ? checked : value
    }))
  }

  const onSubmit = async () => {
    const correctFormData = {
      username: form.username,
      email: form.email,
      password: form.password
    }
    const response = await AuthAPI.signUp(correctFormData)
    if (response.status === 200) {
      message
        .success(
          'You successfully Signed Up, Please proceed to Sign In page',
          3
        )
        .then(() => window.location.assign('/sign-in'))
      setForm(DEFAULT_FORM)
    } else {
      message.error(`Email or username ${response.data.errors.email[0]}`, 3)
    }
  }
  return (
    <div className="wrapper">
      <div className="sign-up__container">
        <div className="sign-up__content">
          <h3 className="sign-up__title">Create new account</h3>
          <div className="sign-up__form">
            <Form layout="vertical" form={antForm}>
              <Form.Item name="username" label="Username" scrollToFirstError>
                <Input
                  name="username"
                  value={form.username}
                  onChange={(e) => onChangeForm(e)}
                  autoFocus
                  validateStatus="error"
                />
              </Form.Item>
              <Form.Item
                name={['user', 'email']}
                label="Email address"
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!'
                  }
                ]}
              >
                <Input
                  name="email"
                  value={form.email}
                  onChange={(e) => onChangeForm(e)}
                  validateStatus="error"
                />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
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
                  value={form.password}
                  onChange={(e) => onChangeForm(e)}
                  allowClear
                  validateStatus="error"
                />
              </Form.Item>
              <Form.Item
                label="Repeat Password"
                name="repeatPassword"
                rules={[
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('Passwords must match'))
                    }
                  })
                ]}
              >
                <Input.Password allowClear validateStatus="error" />
              </Form.Item>
              <Divider />
              <Form.Item name="agreement">
                <Checkbox
                  name="agreement"
                  checked={form.agreement}
                  onChange={(e) => onChangeForm(e)}
                >
                  I agree to the processing of my personal information
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  onClick={onSubmit}
                >
                  Create
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="redirect">
            <p>
              Already have an account? <NavLink to="/sign-in">Sign In</NavLink>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
