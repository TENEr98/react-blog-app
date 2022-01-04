import { Spin } from 'antd'

import './Loading.scss'

const LoadingComponent = () => {
  return (
    <div className="loading">
      <Spin size="large" />
    </div>
  )
}

export default LoadingComponent
