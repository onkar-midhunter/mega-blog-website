import React from 'react'
import logo from '../assets/MegaBlogLogo.png'

function Logo({width = '100px'}) {
  return (
     <img src={logo} alt="MegaBlog Logo" style={{ width }} />
  )
}

export default Logo