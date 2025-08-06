import React from 'react'
import GioiThieuKS from '../Components/GioiThieuKS/GioiThieuKS'
import GioiThieuCN from '../Components/GioiThieuCN/GioiThieuCN'
import GioiThieuDV from '../Components/GioiThieuDV/GioiThieuDV'

const Home = () => {
  return (
    <div>
      <GioiThieuKS/>
      <GioiThieuCN/>
      <GioiThieuDV/>
    </div>
  )
}

export default Home
