import React from 'react'
import Header from './_Components/Header'

function Provider({children}) {
  return (
    <div>
        <Header />
        {children}
    </div>
  )
}

export default Provider