import { useEffect } from 'react'
import { Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import userPhotoPlaceholder from '../../assets/img/userPhotoPlaceholder.png'
import { onChangeLocalStorage } from '../../store/authSlice'
import './Navbar.scss'

const Navbar = () => {
  const dispatch = useDispatch()
  const { username, isAuth } = useSelector((state) => state.auth)

  useEffect(() => {
    if (localStorage.getItem('user'))
      dispatch(
        onChangeLocalStorage({
          username: localStorage.getItem('user'),
          isAuth: true
        })
      )
    return () => {}
  }, [])

  const onClickLogOut = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('t')
    dispatch(onChangeLocalStorage({ username: '', isAuth: false }))
  }

  return (
    <header className="header">
      <NavLink to="/" className="header__title">
        Realworld Blog
      </NavLink>
      <div className="header__actions">
        {isAuth ? (
          <>
            <NavLink
              to="/new-article"
              className="header__action green"
              component={Button}
            >
              Create article
            </NavLink>
            <div className="header__avatar">
              <NavLink to="/edit-profile" component={Button}>
                {username}
              </NavLink>
              <div className="header__img">
                <img src={userPhotoPlaceholder} />
              </div>
            </div>
            <NavLink
              to="/"
              className="header__action grey"
              component={Button}
              onClick={onClickLogOut}
            >
              Log Out
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/sign-in"
              component={Button}
              className="header__action"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/sign-up"
              component={Button}
              className="header__action green"
            >
              Sign Up
            </NavLink>
          </>
        )}
      </div>
    </header>
  )
}

export default Navbar
