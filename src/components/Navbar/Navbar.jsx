import { Button } from 'antd'
import { Link, NavLink } from 'react-router-dom'

import './Navbar.css'

const Navbar = () => {
  return (
    <div className="header">
      <h3 className="header__title">Realworld Blog</h3>
      <div className="header__actions">
        <NavLink to="/sign-in" component={Button}>
          Sign In
        </NavLink>
        <Link component={Button}>Sign Up</Link>
      </div>
    </div>
  )
}

export default Navbar
