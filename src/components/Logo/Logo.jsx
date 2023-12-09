/* eslint-disable no-unused-vars */
import React from 'react'

const Logo = () => {
  return (
    <div>
        <img src='/images/logo-devlinks-large.svg' alt='logo-devlinks-large' className='hidden lg:block' />
        <img src='/images/logo-devlinks-small.svg' alt='logo-devlinks-large' className='lg:hidden block' />
    </div>
  )
}

export default Logo