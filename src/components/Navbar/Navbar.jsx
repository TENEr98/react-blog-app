import { Button } from 'antd'
import { NavLink } from 'react-router-dom'

import './Navbar.scss'

const Navbar = () => {
  return (
    <header className="header">
      <NavLink to="/" className="header__title">
        Realworld Blog
      </NavLink>
      <div className="header__actions">
        <NavLink to="/sign-in" component={Button}>
          Sign In
        </NavLink>
        <NavLink to="/sign-up" component={Button}>
          Sign Up
        </NavLink>
      </div>
    </header>
  )
}

export default Navbar
