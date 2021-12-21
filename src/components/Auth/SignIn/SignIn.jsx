import React, { useState } from 'react'

import { Button, Form, Input, message } from 'antd'
import { NavLink } from 'react-router-dom'

import { AuthAPI } from '../../../api'

import './SignIn.scss'

const DEFAULT_FORM = {
  email: '',
  password: ''
}

const SignIn = () => {
  const [form, setForm] = useState(DEFAULT_FORM)

  const [antForm] = Form.useForm()

  const onChangeForm = ({ target: { value, name } }) => {
    setForm((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const onSubmit = async () => {
    const response = await AuthAPI.signIn(form)
    if (response.status === 200) {
      localStorage.setItem('t', response.data.user.token)
      localStorage.setItem('user', response.data.user.username)
      message
        .success('You successfully Sign In', 3)
        .then(() => window.location.assign('/'))
      setForm(DEFAULT_FORM)
    } else {
      message.error(`Email ${response.data.errors.email[0]}`, 3)
    }
  }
  return (
    <div className="wrapper">
      <div className="sign-in__container">
        <div className="sign-in__content">
          <h3 className="sign-in__title">Sign In</h3>
          <div className="sign-in__form">
            <Form layout="vertical" form={antForm}>
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
              <Form.Item label="Password" name="password">
                <Input.Password
                  name="password"
                  value={form.password}
                  onChange={(e) => onChangeForm(e)}
                  allowClear
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  onClick={onSubmit}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
          <div className="redirect">
            <p>
              Already have an account? <NavLink to="/sign-up">Sign Up</NavLink>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
