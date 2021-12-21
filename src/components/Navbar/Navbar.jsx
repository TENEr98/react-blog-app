import { useEffect, useState } from 'react'

import { Button } from 'antd'
import { NavLink } from 'react-router-dom'

import './Navbar.scss'

const Navbar = () => {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    !localStorage.getItem('t') ? setIsAuth(false) : setIsAuth(true)
  }, [localStorage.getItem('t')])

  return (
    <header className="header">
      <NavLink to="/" className="header__title">
        Realworld Blog
      </NavLink>
      <div className="header__actions">
        {isAuth ? (
          <>
            <NavLink to="/new-article" component={Button}>
              Create article
            </NavLink>
            <NavLink to="/edit-profile" component={Button}>
              {localStorage.getItem('username')}
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
              className="header__action"
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
