import { Spin } from 'antd'

import './Loader.scss'

const Loader = () => {
  return (
    <div className="loading">
      <Spin size="large" />
    </div>
  )
}

export default Loader
